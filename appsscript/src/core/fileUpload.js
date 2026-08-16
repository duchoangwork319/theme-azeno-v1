import { createTextOutput } from "./response.js";

/**
 * Processes file uploads from the form data.
 * @param {Object} formData - The form data submitted by the user.
 * @param {string} fieldKey - The key for the file upload field.
 * @param {Object} specConfig - The configuration for the file upload field.
 * @returns {Object} - An object containing success status and either blobs or a text output.
 */
export function processFileUploads(formData, fieldKey, specConfig) {
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
export function uploadFiles(folder, blobs) {
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
export function createAddOnMessageSection(title, files) {
  let addOnMessage = "";
  if (files.length > 0) {
    addOnMessage += `<br><br><strong>${title}:</strong><br>`;
    files.forEach(file => {
      addOnMessage += `<a href="${file.fileUrl}" target="_blank">${file.filename}</a><br>`;
    });
  }
  return addOnMessage;
}
