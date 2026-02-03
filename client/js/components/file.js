'use strict';

import Compressor from 'compressorjs';

/**
 * Reads a file as an ArrayBuffer
 * @param {File} file - The file to read
 * @returns {Promise<ArrayBuffer>} - A promise that resolves with the file's ArrayBuffer
 */
function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Compresses an image file using Compressor.js
 * @param {File} file - The image file to compress
 * @returns {Promise<File>} - A promise that resolves with the compressed image file
 */
function compress(file) {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.6,
      mimeType: 'image/jpeg', // Convert to JPEG
      success(result) {
        let compressedFile = result;
        if (compressedFile instanceof Blob) {
          compressedFile = new File([result], file.name, { type: result.type });
        }
        resolve(compressedFile);
      },
      error(err) {
        reject(err);
      }
    });
  });
}

/**
 * Compresses multiple image files
 * @param {File[]} files - The image files to compress
 * @returns {Promise<File[]>} - A promise that resolves with an array of compressed image files
 */
function compressMultiple(files) {
  return Promise.all(files.map(file => compress(file)));
}

/**
 * Processes files by reading their data and storing in the file input's data attribute
 * @param {JQuery<HTMLElement>} fileElement - The file input element
 * @param {File[]} files - The files to process
 */
async function processFiles(fileElement, files) {
  const uploadedFiles = [];

  for (let i = 0; i < files.length; i++) {
    try {
      const file = files[i];
      const arrayBuffer = await readFile(file);
      const uint8Array = new Uint8Array(arrayBuffer);
      const fileData = {
        name: file.name,
        type: file.type,
        size: file.size,
        data: Array.from(uint8Array)
      };
      uploadedFiles.push(fileData);
      fileElement.data('uploaded-files', uploadedFiles);
    } catch (error) {
      console.error("Error reading file:", error);
      fileElement.data('uploaded-files', []);
    }
  }
}

/**
 * Handles file input change event to read and store file data
 * @param {JQuery<HTMLElement>} formElement - The form element containing the file input
 */
export function initFileInput(formElement) {
  formElement.find('input[type="file"]').on('change', async function (e) {
    const files = e.target.files;
    const self = $(this);
    const formGroup = self.parents('.form-group');
    const compressFiles = self.data('compress-files') || false;

    self.data('uploaded-files', []);

    if (!files || !files.length) return;

    formGroup.spinner().start();

    if (compressFiles) {
      const compressedFiles = await compressMultiple(Array.from(files));
      processFiles(self, compressedFiles);
    } else {
      processFiles(self, files);
    }

    formGroup.spinner().stop();
  });
}

/**
 * Appends file data from the file input's data attribute to the FormData object
 * @param {FormData} formData - The FormData object to append to
 * @param {JQuery<HTMLElement>} fileElement - The file input element
 * @returns {FormData} - The updated FormData object
 */
export function appendToFormData(formData, fileElement) {
  if (!fileElement || fileElement.length === 0) return formData;
  fileElement.each(function () {
    const $fileInput = $(this);
    const inputName = $fileInput.attr('name').replace('[]', '');
    const uploadedFiles = $fileInput.data('uploaded-files') || [];

    uploadedFiles.forEach((file, idx) => {
      formData.append(`${inputName}_name_${idx}`, file.name);
      formData.append(`${inputName}_type_${idx}`, file.type);
      formData.append(`${inputName}_data_${idx}`, file.data);
    });

    formData.append(`${inputName}_count`, uploadedFiles.length);
  });
  return formData;
}
