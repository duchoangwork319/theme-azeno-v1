function createTextOutput(field, success, message) {
  return ContentService.createTextOutput(JSON.stringify({
    field: field,
    success: success,
    message: message
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const scriptProperties = PropertiesService.getScriptProperties();
    const folderId = scriptProperties.getProperty('FOLDER_ID');
    const propWarrantyFileMaxFiles = scriptProperties.getProperty('WARRANTY_FILE_MAX_FILES') || '5';
    const propWarrantyFileMaxSizeMB = scriptProperties.getProperty('WARRANTY_FILE_MAX_SIZE_MB') || '5';
    const spreadsheetId = scriptProperties.getProperty('SPREADSHEET_ID');

    const formData = JSON.parse(e.postData.contents);
    const warrantyFileCount = parseInt(formData.warrantyFile_count || 0, 10);
    const warrantyMaxTotalFiles = parseInt(propWarrantyFileMaxFiles, 10);
    const warrantyMaxTotalSizeBytes = parseInt(propWarrantyFileMaxSizeMB, 10) * 1024 * 1024; // Convert MB to bytes

    if (warrantyFileCount > warrantyMaxTotalFiles) {
      return createTextOutput("warrantyFile", false, `Too many files uploaded. Maximum is ${warrantyMaxTotalFiles}. Current is ${warrantyFileCount}.`);
    }

    const folder = DriveApp.getFolderById(folderId);
    const warrantyUploadedFiles = [];
    const warrantyBlobs = [];

    for (let i = 0; i < warrantyFileCount; i++) {
      const filename = formData[`warrantyFile_name_${i}`];
      const filetype = formData[`warrantyFile_type_${i}`];
      const byteArray = formData[`warrantyFile_data_${i}`].split(',').map(Number);
      const fileBlob = Utilities.newBlob(byteArray, filetype, filename);
      warrantyBlobs.push(fileBlob);
    }

    const totalSize = warrantyBlobs.reduce((sum, blob) => sum + blob.getBytes().length, 0);
    if (totalSize > warrantyMaxTotalSizeBytes) {
      return createTextOutput("warrantyFile", false, `Total file size exceeds ${warrantyMaxTotalSizeBytes} bytes limit. Current is ${totalSize} bytes.`);
    }

    warrantyBlobs.forEach(blob => {
      const newFile = folder.createFile(blob);
      warrantyUploadedFiles.push({
        filename: blob.getName(),
        fileUrl: newFile.getUrl()
      });
    });

    return createTextOutput(null, true, "Files uploaded successfully.");

  } catch (err) {
    Logger.log("Error during doPost: " + err.message);
    return createTextOutput(null, false, "An error occurred: " + err.message);
  }
}
