/**
 * Creates a JSON response for the contact form submission.
 * @param {string} field - The field that caused the error (if any).
 * @param {boolean} success - Whether the operation was successful.
 * @param {string} message - The message to include in the response.
 * @param {Object|null} addition - Additional data to include in the response.
 * @returns {ContentService.TextOutput} - The JSON response.
 */
function createTextOutput(field, success, message, addition = null) {
  return ContentService.createTextOutput(JSON.stringify({
    field: field,
    success: success,
    message: message,
    addition: addition
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Retrieves the script configuration from script properties.
 * @returns {Object} - The script configuration object.
 */
function getScriptConfig() {
  const scriptProperties = PropertiesService.getScriptProperties();
  const cfg = scriptProperties.getProperty('SCRIPT_CFG');
  return JSON.parse(cfg);
}

/**
 * Sanitizes HTML content to prevent XSS attacks.
 * @param {string} str - The string to sanitize.
 * @returns {string} - The sanitized string.
 */
function sanitizeHTML(str) {
  return String(str).replace(/[^\w. ]/gi, function (c) {
    return '&#' + c.charCodeAt(0) + ';';
  });
}

/**
 * Sends an email notification.
 * @param {Object} data - The data to include in the email.
 * @returns {void}
 */
function sendMail(data) {
  const recipient = data.recipient;
  const subject = data.subject;
  let message = data.message;

  if (!recipient || !subject || !message) {
    Logger.log("Mail recipient, subject, or message not set in script properties.");
    return;
  }

  if (data.content) {
    Object.keys(data.content).forEach(key => {
      let encoded = sanitizeHTML(data.content[key]);
      message = message.replace(new RegExp(`{{${key}}}`, 'g'), encoded);
    });
  }

  MailApp.sendEmail(
    recipient,
    subject,
    '', // Plain text body (empty since we're using HTML body)
    {
      name: 'Notifications',
      noReply: true,
      htmlBody: message
    }
  );
}

/**
 * Validates the form data against the provided configuration.
 * @param {Object} formData - The form data submitted by the user.
 * @param {Object} config - The validation configuration.
 * @returns {ContentService.TextOutput|null} - The JSON response if validation fails, or null if it passes.
 */
function validateFormData(formData, config) {
  for (const key in formData) {
    if (!config.fields[key]) {
      continue;
    }

    const fieldConfig = config.fields[key];
    const value = formData[key];

    if (fieldConfig.required && (!value || value.trim() === "")) {
      return createTextOutput(key, false, fieldConfig.defaultMessage);
    }
    if (fieldConfig.maxlength && value.length > fieldConfig.maxlength) {
      return createTextOutput(key, false, fieldConfig.defaultMessage);
    }
    if (fieldConfig.pattern && !new RegExp(fieldConfig.pattern).test(value)) {
      return createTextOutput(key, false, fieldConfig.defaultMessage);
    }
  }
  return null;
}

/**
 * Processes file uploads from the form data.
 * @param {Object} formData - The form data submitted by the user.
 * @param {string} fieldKey - The key for the file upload field.
 * @param {Object} specConfig - The configuration for the file upload field.
 * @returns {Object} - An object containing success status and either blobs or a text output.
 */
function processFileUploads(formData, fieldKey, specConfig) {
  const maxFiles = parseInt(specConfig.maxFiles, 10);
  const maxSizeMB = parseInt(specConfig.maxSizeMB, 10);
  const filenamePrefix = specConfig.filenamePrefix || '';
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  const fileCount = parseInt(formData[`${fieldKey}_count`] || 0, 10);
  const blobs = [];

  if (fileCount > maxFiles) {
    return {
      success: false,
      textOutput: createTextOutput(fieldKey, false, `Too many files uploaded. Maximum is ${maxFiles}. Current is ${fileCount}.`)
    };
  }

  for (let i = 0; i < fileCount; i++) {
    const filename = formData[`${fieldKey}_name_${i}`];
    const filetype = formData[`${fieldKey}_type_${i}`];
    const byteArray = formData[`${fieldKey}_data_${i}`].split(',').map(Number);
    const fileBlob = Utilities.newBlob(byteArray, filetype, filenamePrefix + filename);
    blobs.push(fileBlob);
  }

  const totalSize = blobs.reduce((sum, blob) => sum + blob.getBytes().length, 0);
  if (totalSize > maxSizeBytes) {
    return {
      success: false,
      textOutput: createTextOutput(fieldKey, false, `Total file size exceeds ${maxSizeMB} MB limit. Current is ${(totalSize / (1024 * 1024)).toFixed(2)} MB.`)
    };
  }

  return {
    success: true,
    blobs: blobs
  };
}

/**
 * Uploads files to the specified folder.
 * @param {Folder} folder - The Google Drive folder to upload files to.
 * @param {Array<Blob>} blobs - The array of file blobs to upload.
 * @returns {Array<Object>} - An array of uploaded file information.
 */
function uploadFiles(folder, blobs) {
  return blobs.map(blob => {
    const newFile = folder.createFile(blob);
    return {
      filename: blob.getName(),
      fileUrl: newFile.getUrl()
    };
  });
}

/**
 * Creates an additional message section for uploaded files.
 * @param {string} title - The title for the section.
 * @param {Array<Object>} files - The array of uploaded file information.
 * @returns {string} - The HTML string for the additional message section.
 */
function createAddOnMessageSection(title, files) {
  let addOnMessage = "";
  if (files.length > 0) {
    addOnMessage += `<br><br><strong>${title}:</strong><br>`;
    files.forEach(file => {
      addOnMessage += `<a href="${file.fileUrl}" target="_blank">${file.filename}</a><br>`;
    });
  }
  return addOnMessage;
}

/**
 * Handles the submission of the contact form.
 * @param {Object} formData - The form data submitted by the user.
 * @param {Object} config - The configuration for the warranty form.
 * @returns {ContentService.TextOutput} - The JSON response.
 */
function handleContactFormSubmission(formData, config) {
  const spreadsheetId = config.CONTACT_US_SPREADSHEET_ID;
  if (!spreadsheetId) {
    throw new Error("Contact Us Spreadsheet ID not set in script properties.");
  }
  const sheet = SpreadsheetApp.openById(spreadsheetId);
  if (!sheet) {
    throw new Error("Sheet 'Contact Us' not found.");
  }
  const timestamp = new Date();
  const fullPhoneNumber = formData.phoneNumber_country + formData.phoneNumber;
  sheet.appendRow([
    timestamp,
    formData.name,
    formData.email,
    fullPhoneNumber,
    formData.helpWith,
    formData.orderNo,
    formData.shippingToCountry,
    formData.message
  ]);
  if (config.MAIL_ENABLE) {
    sendMail({
      subject: "Notifications: New Contact Us Form Submission",
      recipient: config.MAIL_RECIPIENT,
      message: `A new message has been submitted through your website's Contact Us form. Please follow up with the customer as soon as possible.<br/><br/><strong>Request Details:</strong><br/>- Name: {{name}}<br/>- Email: {{email}}<br/>- Phone: {{phoneNumber}}<br/>- Need help with: {{helpWith}}<br/>- Order: {{orderNo}}<br/>- Shipping to country: {{shippingToCountry}}<br/>- Message: {{message}}`,
      content: {
        name: formData.name,
        email: formData.email,
        phoneNumber: fullPhoneNumber,
        helpWith: formData.helpWith,
        orderNo: formData.orderNo,
        shippingToCountry: formData.shippingToCountry,
        message: formData.message
      }
    });
  }
  return createTextOutput(null, true, "Contact us form submitted successfully.");
}

/**
 * Handles the submission of the warranty form.
 * @param {Object} formData - The form data submitted by the user.
 * @param {Object} config - The configuration for the warranty form.
 * @returns {ContentService.TextOutput} - The JSON response.
 */
function handleWarrantyFormSubmission(formData, config) {
  const spreadsheetId = config.WARRANTY_SPREADSHEET_ID;
  if (!spreadsheetId) {
    throw new Error("Spreadsheet ID not set in script properties.");
  }
  const folderId = config.WARRANTY_FOLDER_ID;
  if (!folderId) {
    throw new Error("Folder ID not set in script properties.");
  }
  const sheet = SpreadsheetApp.openById(spreadsheetId);
  if (!sheet) {
    throw new Error("Sheet 'Warranty' not found.");
  }
  const folder = DriveApp.getFolderById(folderId);
  if (!folder) {
    throw new Error("Folder not found.");
  }

  const warrantyBlobs = processFileUploads(formData, 'warrantyFile', config.fileUploads.warrantyFile);

  if (!warrantyBlobs.success) return warrantyBlobs.textOutput;

  const warrantyUploadedFiles = uploadFiles(folder, warrantyBlobs.blobs);
  const timestamp = new Date();
  const fullPhoneNumber = formData.phoneNumber_country + formData.phoneNumber;
  sheet.appendRow([
    timestamp,
    formData.orderNo,
    formData.email,
    formData.productModelNo,
    formData.name,
    formData.address,
    formData.zipCity,
    formData.complaint,
    formData.message,
    formData.area,
    fullPhoneNumber,
    warrantyUploadedFiles.map(file => file.fileUrl).join(', ')
  ]);

  let addOnMessage = createAddOnMessageSection("Product Files", warrantyUploadedFiles);

  if (config.MAIL_ENABLE) {
    sendMail({
      subject: "Notifications: New Warranty Form Submission",
      recipient: config.MAIL_RECIPIENT,
      message: `A new warranty request has been submitted through your website. Please follow up with the customer as soon as possible.<br/><br/><strong>Request Details:</strong><br/>- Name: {{name}}<br/>- Email: {{email}}<br/>- Phone: {{phoneNumber}}<br/>- Order No: {{orderNo}}<br/>- Product Model No: {{productModelNo}}<br/>- Complaint: {{complaint}}<br/>- Message: {{message}}<br/>- Area: {{area}}<br/>- Address: {{address}}<br/>- Zip/City: {{zipCity}}<br/>{{addOnMessage}}`,
      content: {
        name: formData.name,
        email: formData.email,
        phoneNumber: fullPhoneNumber,
        orderNo: formData.orderNo,
        productModelNo: formData.productModelNo,
        complaint: formData.complaint,
        message: formData.message,
        area: formData.area,
        address: formData.address,
        zipCity: formData.zipCity,
        addOnMessage: addOnMessage
      }
    });
  }

  return createTextOutput(null, true, "Warranty form submitted successfully.");
}

/**
 * Handles the submission of the damage crash form.
 * @param {Object} formData - The form data submitted by the user.
 * @param {Object} config - The configuration for the damage crash form.
 * @returns {ContentService.TextOutput} - The JSON response.
 */
function handleDmgCrashFormSubmission(formData, config) {
  const spreadsheetId = config.DAMAGE_CRASH_SPREADSHEET_ID;
  if (!spreadsheetId) {
    throw new Error("Spreadsheet ID not set in script properties.");
  }
  const folderId = config.DAMAGE_CRASH_FOLDER_ID;
  if (!folderId) {
    throw new Error("Folder ID not set in script properties.");
  }
  const sheet = SpreadsheetApp.openById(spreadsheetId);
  if (!sheet) {
    throw new Error("Sheet 'Crash Damage' not found.");
  }
  const folder = DriveApp.getFolderById(folderId);
  if (!folder) {
    throw new Error("Folder not found.");
  }

  const dmgCrashProdBlobs = processFileUploads(formData, 'dmgCrashProdFile', config.fileUploads.dmgCrashProdFile);

  if (!dmgCrashProdBlobs.success) return dmgCrashProdBlobs.textOutput;

  const dmgCrashAttachmentBlobs = processFileUploads(formData, 'dmgCrashAttachmentFile', config.fileUploads.dmgCrashAttachmentFile);

  if (!dmgCrashAttachmentBlobs.success) return dmgCrashAttachmentBlobs.textOutput;

  const dmgCrashProdFiles = uploadFiles(folder, dmgCrashProdBlobs.blobs);
  const dmgCrashAttachmentFiles = uploadFiles(folder, dmgCrashAttachmentBlobs.blobs);

  const timestamp = new Date();
  const fullPhoneNumber = formData.phoneNumber_country + formData.phoneNumber;
  sheet.appendRow([
    timestamp,
    formData.email,
    formData.productModelNo,
    formData.size,
    formData.name,
    formData.address,
    formData.zipCity,
    formData.area,
    fullPhoneNumber,
    formData.message,
    dmgCrashProdFiles.map(file => file.fileUrl).join(', '),
    dmgCrashAttachmentFiles.map(file => file.fileUrl).join(', ')
  ]);

  const addOnMessage1 = createAddOnMessageSection("Product Files", dmgCrashProdFiles);
  const addOnMessage2 = createAddOnMessageSection("Attachment Files", dmgCrashAttachmentFiles);
  const addOnMessage = addOnMessage1 + addOnMessage2;

  if (config.MAIL_ENABLE) {
    sendMail({
      subject: "Notifications: New Damage and Crash Replacement Form Submission",
      recipient: config.MAIL_RECIPIENT,
      message: `A new damage and crash replacement request has been submitted through your website. Please follow up with the customer as soon as possible.<br/><br/><strong>Request Details:</strong><br/>- Name: {{name}}<br/>- Email: {{email}}<br/>- Phone: {{phoneNumber}}<br/>- Product Model No: {{productModelNo}}<br/>- Size: {{size}}<br/>- Address: {{address}}<br/>- Zip/City: {{zipCity}}<br/>- Area: {{area}}<br/>- Message: {{message}}<br/>{{addOnMessage}}`,
      content: {
        name: formData.name,
        email: formData.email,
        phoneNumber: fullPhoneNumber,
        productModelNo: formData.productModelNo,
        size: formData.size,
        area: formData.area,
        address: formData.address,
        zipCity: formData.zipCity,
        message: formData.message,
        addOnMessage: addOnMessage
      }
    });
  }

  return createTextOutput(null, true, "Crash damage form submitted successfully.");
}

/**
 * Safely parses a JSON string
 * @param {string} text - The JSON string to parse
 * @returns {Object|null} The parsed object or null if parsing fails
 */
function safeJsonParse(text) {
  try {
    const json = JSON.parse(text);
    return json;
  } catch (error) {
    Logger.log("Error during safeJsonParse: " + error.message);
  }
  return null;
}

/**
 * Verifies the reCAPTCHA token.
 * @param {string} token - The reCAPTCHA token to verify.
 * @param {Object} config - The configuration object containing reCAPTCHA settings.
 * @returns {boolean} - Whether the reCAPTCHA token is valid.
 */
function verifyRecaptcha(token, config) {
  if (!config.RECAPTCHA_ENABLE) return true;

  const secret = config.RECAPTCHA_SECRETKEY;
  if (!secret) {
    throw new Error("reCAPTCHA secret key is invalid.");
  }
  const url = 'https://www.google.com/recaptcha/api/siteverify';
  const options = {
    method: 'post',
    payload: {
      secret: secret,
      response: token
    }
  };

  const response = UrlFetchApp.fetch(url, options);
  const data = safeJsonParse(response.getContentText());

  return {
    success: data && data.success === true,
    errorCodes: data && data['error-codes'] ? data['error-codes'] : 'na'
  };
}

function doPost(e) {
  try {
    const formData = JSON.parse(e.postData.contents);
    const formType = formData.formType;
    const allowedFormTypes = ["contact-us", "warranty", "damage-crash"];

    if (!formType || !allowedFormTypes.includes(formType)) {
      return createTextOutput(null, false, "Invalid or missing form type.");
    }

    const scriptCfg = getScriptConfig();

    const result = verifyRecaptcha(formData['g-recaptcha-response'], scriptCfg);
    if (!result.success) {
      return createTextOutput(null, false, "reCAPTCHA verification failed.", { errorCodes: result.errorCodes });
    }

    const formCfg = JSON.parse(HtmlService.createHtmlOutputFromFile(formType + "-config.html").getContent());
    const validationError = validateFormData(formData, formCfg);
    const cfg = Object.assign({}, scriptCfg, formCfg);

    if (validationError) {
      return validationError;
    }

    if (formType === "contact-us") {
      return handleContactFormSubmission(formData, cfg);
    }

    if (formType === "warranty") {
      return handleWarrantyFormSubmission(formData, cfg);
    }

    if (formType === "damage-crash") {
      return handleDmgCrashFormSubmission(formData, cfg);
    }

    return createTextOutput(null, false, "Unknown form type.");
  } catch (error) {
    Logger.log("Error during doPost: " + error.message);
    return createTextOutput(null, false, "An server internal error occurred.");
  }
}
