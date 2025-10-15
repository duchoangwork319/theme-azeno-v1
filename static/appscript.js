/**
 * Creates a JSON response for the contact form submission.
 * @param {string} field - The field that caused the error (if any).
 * @param {boolean} success - Whether the operation was successful.
 * @param {string} message - The message to include in the response.
 * @returns {ContentService.TextOutput} - The JSON response.
 */
function createTextOutput(field, success, message) {
  return ContentService.createTextOutput(JSON.stringify({
    field: field,
    success: success,
    message: message
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Sends an email notification.
 * @param {Object} data - The data to include in the email.
 * @returns {void}
 */
function sendMail(data) {
  const scriptProperties = PropertiesService.getScriptProperties();
  const enable = scriptProperties.getProperty('MAIL_ENABLE');
  const recipient = scriptProperties.getProperty('MAIL_RECIPIENT');
  const subject = data.subject;
  let message = data.message;

  if (enable !== 'true') {
    return;
  }

  if (!recipient || !subject || !message) {
    Logger.log("Mail recipient, subject, or message not set in script properties.");
    return;
  }

  if (data.content) {
    Object.keys(data.content).forEach(key => {
      message = message.replace(new RegExp(`{{${key}}}`, 'g'), data.content[key]);
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
    const fileBlob = Utilities.newBlob(byteArray, filetype, filename);
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
 * Handles the submission of the contact form.
 * @param {Object} formData - The form data submitted by the user.
 * @returns {ContentService.TextOutput} - The JSON response.
 */
function handleContactFormSubmission(formData) {
  const scriptProperties = PropertiesService.getScriptProperties();
  const spreadsheetId = scriptProperties.getProperty('CONTACT_US_SPREADSHEET_ID');
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
  sendMail({
    subject: "Notifications: New Contact Us Form Submission",
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
  return createTextOutput(null, true, "Contact us form submitted successfully.");
}

/**
 * Handles the submission of the warranty form.
 * @param {Object} formData - The form data submitted by the user.
 * @param {Object} config - The configuration for the warranty form.
 * @returns {ContentService.TextOutput} - The JSON response.
 */
function handleWarrantyFormSubmission(formData, config) {
  const scriptProperties = PropertiesService.getScriptProperties();
  const spreadsheetId = scriptProperties.getProperty('WARRANTY_SPREADSHEET_ID');
  if (!spreadsheetId) {
    throw new Error("Spreadsheet ID not set in script properties.");
  }
  const folderId = scriptProperties.getProperty('WARRANTY_FOLDER_ID');
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

  const warrantyUploadedFiles = [];
  const warrantyBlobs = processFileUploads(formData, 'warrantyFile', config.fileUploads.warrantyFile);
  if (!warrantyBlobs.success) {
    return warrantyBlobs.textOutput;
  }

  warrantyBlobs.blobs.forEach(blob => {
    const newFile = folder.createFile(blob);
    warrantyUploadedFiles.push({
      filename: blob.getName(),
      fileUrl: newFile.getUrl()
    });
  });

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

  let addOnMessage = '';
  if (warrantyUploadedFiles.length > 0) {
    addOnMessage += `<br><br><strong>Product Files:</strong><br>`;
    warrantyUploadedFiles.forEach(file => {
      addOnMessage += `<a href="${file.fileUrl}" target="_blank">${file.filename}</a><br>`;
    });
  }

  sendMail({
    subject: "Notifications: New Warranty Form Submission",
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

  return createTextOutput(null, true, "Warranty form submitted successfully.");
}

/**
 * Handles the submission of the damage crash form.
 * @param {Object} formData - The form data submitted by the user.
 * @param {Object} config - The configuration for the damage crash form.
 * @returns {ContentService.TextOutput} - The JSON response.
 */
function handleDmgCrashFormSubmission(formData, config) {
  const scriptProperties = PropertiesService.getScriptProperties();
  const spreadsheetId = scriptProperties.getProperty('CRASH_DAMAGE_SPREADSHEET_ID');
  if (!spreadsheetId) {
    throw new Error("Spreadsheet ID not set in script properties.");
  }
  const folderId = scriptProperties.getProperty('CRASH_DAMAGE_FOLDER_ID');
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

  const dmgCrashProdFiles = [];
  const dmgCrashProdBlobs = processFileUploads(formData, 'dmgCrashProdFile', config.fileUploads.dmgCrashProdFile);
  if (!dmgCrashProdBlobs.success) {
    return dmgCrashProdBlobs.textOutput;
  }

  const dmgCrashAttachmentFiles = [];
  const dmgCrashAttachmentBlobs = processFileUploads(formData, 'dmgCrashAttachmentFile', config.fileUploads.dmgCrashAttachmentFile);
  if (!dmgCrashAttachmentBlobs.success) {
    return dmgCrashAttachmentBlobs.textOutput;
  }

  dmgCrashProdBlobs.blobs.forEach(blob => {
    const newFile = folder.createFile(blob);
    dmgCrashProdFiles.push({
      filename: blob.getName(),
      fileUrl: newFile.getUrl()
    });
  });

  dmgCrashAttachmentBlobs.blobs.forEach(blob => {
    const newFile = folder.createFile(blob);
    dmgCrashAttachmentFiles.push({
      filename: blob.getName(),
      fileUrl: newFile.getUrl()
    });
  });

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

  let addOnMessage = '';
  if (dmgCrashProdFiles.length > 0) {
    addOnMessage += `<br><strong>Product Files:</strong><br>`;
    dmgCrashProdFiles.forEach(file => {
      addOnMessage += `<a href="${file.fileUrl}" target="_blank">${file.filename}</a><br>`;
    });
  }
  if (dmgCrashAttachmentFiles.length > 0) {
    addOnMessage += `<br><strong>Attachment Files:</strong><br>`;
    dmgCrashAttachmentFiles.forEach(file => {
      addOnMessage += `<a href="${file.fileUrl}" target="_blank">${file.filename}</a><br>`;
    });
  }

  sendMail({
    subject: "Notifications: New Damage and Crash Replacement Form Submission",
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

  return createTextOutput(null, true, "Crash damage form submitted successfully.");
}

function doPost(e) {
  try {
    const formData = JSON.parse(e.postData.contents);
    const formType = formData.formType;
    const allowedFormTypes = ["contact-us", "warranty", "damage-crash"];

    if (!formType || !allowedFormTypes.includes(formType)) {
      return createTextOutput(null, false, "Invalid or missing form type.");
    }

    const configJson = HtmlService.createHtmlOutputFromFile(formType + "-config.html").getContent();
    const config = JSON.parse(configJson);
    const validationError = validateFormData(formData, config);

    if (validationError) return validationError;

    if (formType === "contact-us") {
      return handleContactFormSubmission(formData);
    }

    if (formType === "warranty") {
      return handleWarrantyFormSubmission(formData, config);
    }

    if (formType === "damage-crash") {
      return handleDmgCrashFormSubmission(formData, config);
    }

    return createTextOutput(null, false, "Unknown form type.");
  } catch (error) {
    Logger.log("Error during doPost: " + error.message);
    return createTextOutput(null, false, "An error occurred: " + error.message);
  }
}
