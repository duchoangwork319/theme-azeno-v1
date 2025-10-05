function doPost(e) {
  try {
    const formData = JSON.parse(e.postData.contents);
    const warrantyFileCount = parseInt(formData.warrantyFileCount || 0, 10);
    const maxTotalFiles = 5;
    const maxTotalSizeBytes = 5 * 1024 * 1024; // 5 MB

    if (warrantyFileCount > maxTotalFiles) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: `Too many files uploaded. Maximum is 5. Current is ${warrantyFileCount}.`
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const folder = DriveApp.getFolderById("1gFwaLBvRhVlIgHGFCmaY2vRyDshVIRh6");
    const warrantyUploadedFiles = [];
    const warrantyBlobs = [];

    for (let i = 0; i < warrantyFileCount; i++) {
      const filename = formData[`warrantyFileName_${i}`];
      const filetype = formData[`warrantyFileType_${i}`];
      const byteArray = formData[`warrantyFile_${i}`].split(',').map(Number);
      const fileBlob = Utilities.newBlob(byteArray, filetype, filename);
      warrantyBlobs.push(fileBlob);
    }

    const totalSize = warrantyBlobs.reduce((sum, blob) => sum + blob.getBytes().length, 0);
    if (totalSize > maxTotalSizeBytes) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: `Total file size exceeds 5 MB limit. Current is ${totalSize} bytes.`
      })).setMimeType(ContentService.MimeType.JSON);
    }

    warrantyBlobs.forEach(blob => {
      const newFile = folder.createFile(blob);
      warrantyUploadedFiles.push({
        filename: blob.getName(),
        fileUrl: newFile.getUrl()
      });
    });

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      files: warrantyUploadedFiles
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
