'use strict';

/**
 * Reads a file as an ArrayBuffer
 * @param {File} file - The file to read
 * @returns {Promise<ArrayBuffer>} - A promise that resolves with the file's ArrayBuffer
 */
function readFileAsync(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsArrayBuffer(file);
    });
}

/**
 * Handles file input change event to read and store file data
 */
function handleFileUpload() {
    $('#warrantyForm input[type="file"]').on('change', function (e) {
        const files = e.target.files;
        const self = $(this);
        const uploadedFiles = [];

        Array.from(files).forEach(file => {
            readFileAsync(file).then(arrayBuffer => {
                const uint8Array = new Uint8Array(arrayBuffer);
                const fileData = {
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    data: Array.from(uint8Array)
                };
                uploadedFiles.push(fileData);
                self.data('uploaded-files', uploadedFiles);
            }).catch(error => {
                console.error("Error reading file:", error);
            });
        });
    });
}

/**
 * Validates the file input based on max total files and max total size
 * @param {JQuery<HTMLElement>} target - The file input element
 * @returns {Object} - The validation result
 */
function validateFileInput(target) {
    const fileInput = $(target);
    const maxTotalFiles = parseInt(fileInput.data('max-total-files'), 10) || 5;
    const maxFileSizeMB = parseInt(fileInput.data('max-files-size'), 10) || 5;
    const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024;
    const uploadedFiles = fileInput.data('uploaded-files') || [];
    const totalSize = uploadedFiles.reduce((sum, file) => sum + file.size, 0);

    if (totalSize > maxFileSizeBytes || uploadedFiles.length > maxTotalFiles) {
        return { valid: false };
    }

    return { valid: true };
}

/**
 * Initializes the warranty form submission handling
 */
function initWarrantyForm() {
    $('#warrantyForm').on('submit', function (e) {
        e.preventDefault();

        const self = $(this);
        const form = e.target;
        const button = form.querySelector('button[type="submit"]');
        const formData = new FormData(form, button);

        button.disabled = true;
        self.spinner().start();
        self.find('.invalid-message').css('display', 'none');
        const warrantyFileInput = $('#warranty_file', self);
        const warrantyUploadedFiles = warrantyFileInput.data('uploaded-files') || [];
        const warrantyValidation = validateFileInput(warrantyFileInput);
        if (!warrantyValidation.valid) {
            warrantyFileInput.parents('.form-group').find('.invalid-message').css('display', 'block');
            button.disabled = false;
            self.spinner().stop();
            return;
        }

        warrantyUploadedFiles.forEach((file, index) => {
            formData.append(`warrantyFileName_${index}`, file.name);
            formData.append(`warrantyFileType_${index}`, file.type);
            formData.append(`warrantyFile_${index}`, file.data);
        });
        formData.append('warrantyFileCount', warrantyUploadedFiles.length);

        const formDataObj = Object.fromEntries(formData.entries());
        const body = JSON.stringify(formDataObj);

        fetch(form.action, {
            method: 'POST',
            redirect: "follow",
            headers: {
                'Content-Type': 'text/plain;charset=utf-8'
            },
            body: body
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    alert("Warranty form submitted successfully!");
                } else if (result.message) {
                    alert("Error: " + result.message);
                }
            })
            .catch(err => alert("Submission failed: " + err))
            .finally(() => {
                button.disabled = false;
                self.spinner().stop();
            });
    });
}

$(document).ready(function () {
    if ($('#warrantyForm').length === 0) return;
    console.log("Warranty Form script loaded.");
    handleFileUpload();
    initWarrantyForm();
});
