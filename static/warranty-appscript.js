function createTextOutput(field, success, message) {
  return ContentService.createTextOutput(JSON.stringify({
    field: field,
    success: success,
    message: message
  })).setMimeType(ContentService.MimeType.JSON);
}

function processFileUploads(formData, fieldKey) {
  const scriptProperties = PropertiesService.getScriptProperties();
  const maxFiles = parseInt(scriptProperties.getProperty(`${fieldKey.toUpperCase()}_MAX_FILES`) || '5', 10);
  const maxSizeMB = parseInt(scriptProperties.getProperty(`${fieldKey.toUpperCase()}_MAX_SIZE_MB`) || '5', 10);
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const fileCount = parseInt(formData[`${fieldKey}_count`] || 0, 10);
  if (fileCount > maxFiles) {
    return {
      success: false,
      textOutput: createTextOutput(fieldKey, false, `Too many files uploaded. Maximum is ${maxFiles}. Current is ${fileCount}.`)
    };
  }

  const blobs = [];
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

function sendMail(data) {
  const scriptProperties = PropertiesService.getScriptProperties();
  const enable = scriptProperties.getProperty('MAIL_ENABLE');
  const recipient = scriptProperties.getProperty('MAIL_RECIPIENT');
  const subject = scriptProperties.getProperty('MAIL_SUBJECT') || "New Warranty Form Submission";
  let message = scriptProperties.getProperty('MAIL_MESSAGE');

  if (enable !== 'true') {
    return;
  }
  if (!recipient || !subject || !message) {
    throw new Error("Mail recipient, subject, or message not set in script properties.");
  }

  Object.keys(data).forEach(key => {
    const placeholder = `{{${key}}}`;
    message = message.replace(new RegExp(placeholder, 'g'), data[key]);
  });

  MailApp.sendEmail(
    recipient,
    subject,
    '', // Plain text body (empty since we're using HTML body)
    {
      name: 'Form Notifications',
      noReply: true,
      htmlBody: message
    }
  );
}

function doPost(e) {
  try {
    const scriptProperties = PropertiesService.getScriptProperties();
    const folderId = scriptProperties.getProperty('FOLDER_ID');
    const spreadsheetId = scriptProperties.getProperty('SPREADSHEET_ID');

    if (!spreadsheetId) {
      throw new Error("Spreadsheet ID not set in script properties.");
    }

    const sheet = SpreadsheetApp.openById(spreadsheetId);
    if (!sheet) {
      throw new Error("Sheet 'Warranty' not found.");
    }

    if (!folderId) {
      throw new Error("Folder ID not set in script properties.");
    }

    const formData = JSON.parse(e.postData.contents);
    const email = formData.email;
    const productModelNo = formData.productModelNo;
    const size = formData.size;
    const name = formData.name;
    const address = formData.address;
    const zipCity = formData.zipCity;
    const area = formData.area;
    const phoneCountry = formData.phoneNumber_country;
    const phoneNumber = formData.phoneNumber;
    const fullPhoneNumber = phoneCountry + phoneNumber;

    if (!email || email.length > 100) {
      return createTextOutput("email", false, "Invalid input: 'Email' is required and must not exceed 100 characters.");
    }

    if (!productModelNo || productModelNo.length > 50) {
      return createTextOutput("productModelNo", false, "Invalid input: 'Product Model No.' is required and must not exceed 50 characters.");
    }

    const sizeCollection = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL'];
    if (!size || (size && !sizeCollection.includes(size))) {
      return createTextOutput("size", false, "Invalid input: 'Size' must be one of the predefined options.");
    }

    if (!name || name.length > 50) {
      return createTextOutput("name", false, "Invalid input: 'Name' is required and must not exceed 50 characters.");
    }

    if (!address || address.length > 200) {
      return createTextOutput("address", false, "Invalid input: 'Address' is required and must not exceed 200 characters.");
    }

    if (!zipCity || zipCity.length > 50) {
      return createTextOutput("zipCity", false, "Invalid input: 'Zip/City' is required and must not exceed 50 characters.");
    }

    if (!area || area.length > 50) {
      return createTextOutput("area", false, "Invalid input: 'Area' is required and must not exceed 50 characters.");
    }

    if (phoneCountry && !/^\+\d+$/.test(phoneCountry)) {
      return createTextOutput("phoneNumber", false, "Invalid input: 'Phone Country' must start with '+' followed by numbers.");
    }

    if (!phoneNumber || phoneNumber.length > 15) {
      return createTextOutput("phoneNumber", false, "Invalid input: 'Phone Number' is required and must not exceed 15 characters.");
    }

    const folder = DriveApp.getFolderById(folderId);
    if (!folder) {
      throw new Error("Folder not found.");
    }

    // Validate and process warranty files and attachment files
    const warrantyUploadedFiles = [];
    const warrantyBlobs = processFileUploads(formData, 'warrantyFile');
    if (!warrantyBlobs.success) {
      return warrantyBlobs.textOutput;
    }

    const attachmentUploadedFiles = [];
    const attachmentBlobs = processFileUploads(formData, 'attachmentFile');
    if (!attachmentBlobs.success) {
      return attachmentBlobs.textOutput;
    }

    warrantyBlobs.blobs.forEach(blob => {
      const newFile = folder.createFile(blob);
      warrantyUploadedFiles.push({
        filename: blob.getName(),
        fileUrl: newFile.getUrl()
      });
    });

    attachmentBlobs.blobs.forEach(blob => {
      const newFile = folder.createFile(blob);
      attachmentUploadedFiles.push({
        filename: blob.getName(),
        fileUrl: newFile.getUrl()
      });
    });

    const timestamp = new Date();
    const rowData = [
      timestamp,
      email,
      productModelNo,
      size,
      name,
      address,
      zipCity,
      area,
      fullPhoneNumber,
      warrantyUploadedFiles.map(file => file.fileUrl).join(', '),
      attachmentUploadedFiles.map(file => file.fileUrl).join(', ')
    ];

    sheet.appendRow(rowData);

    let addOnMessage = '';
    if (warrantyUploadedFiles.length > 0) {
      addOnMessage += `<br><br><strong>Product Files:</strong><br>`;
      warrantyUploadedFiles.forEach(file => {
        addOnMessage += `<a href="${file.fileUrl}" target="_blank">${file.filename}</a><br>`;
      });
    }
    if (attachmentUploadedFiles.length > 0) {
      addOnMessage += `<br><br><strong>Attachment Files:</strong><br>`;
      attachmentUploadedFiles.forEach(file => {
        addOnMessage += `<a href="${file.fileUrl}" target="_blank">${file.filename}</a><br>`;
      });
    }

    sendMail({
      name: name,
      email: email,
      phoneNumber: fullPhoneNumber,
      addOnMessage: addOnMessage
    });

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Form submitted successfully.",
      warrantyFiles: warrantyUploadedFiles.map(file => file.filename),
      attachmentFiles: attachmentUploadedFiles.map(file => file.filename)
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log("Error during doPost: " + err.message);
    return createTextOutput(null, false, "An error occurred: " + err.message);
  }
}
