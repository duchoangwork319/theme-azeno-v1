'use strict';

import validation from './components/validation.js';

/**
 * Scrolls the page to the specified element
 * @param {jQuery<HTMLElement>} element - The target element to scroll to
 */
function scrollTo(element) {
    if (!element || !element.length) return;
    $('html, body').animate({
        scrollTop: element.offset().top - 200
    }, 100);
}

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
    $('.custom-form-element input[type="file"]').on('change', function (e) {
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
 * @param {JQuery<HTMLElement>} fileInput - The file input element
 * @returns {Object} - The validation result
 */
function validateFileInput(fileInput) {
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
 * Initializes form submission handling for all custom forms
 */
function initAllCustomForm() {
    $('form.custom-form-element').on('submit', function (e) {
        e.preventDefault();

        const self = $(this);
        const button = self.find('button[type="submit"]').get(0);
        const action = self.attr('action') || '';
        const formData = new FormData(self[0], button);
        const formWrapper = self.parents('.form-wrapper');

        button.disabled = true;
        self.find('.invalid-message').css('display', 'none');
        formWrapper.spinner().start();

        const fileInputs = Array.from($('input[type="file"]', self));

        // Validate file inputs
        for (let i = 0; i < fileInputs.length; i++) {
            const fileInput = $(fileInputs[i]);
            const validation = validateFileInput(fileInput);

            if (!validation.valid) {
                fileInput.parents('.form-group').find('.invalid-message').css('display', 'block');
                button.disabled = false;
                formWrapper.spinner().stop();
                return;
            }
        }

        // Append file data to formData
        fileInputs.forEach((fileInput) => {
            const $fileInput = $(fileInput);
            const inputName = $fileInput.attr('name').replace('[]', '');
            const uploadedFiles = $fileInput.data('uploaded-files') || [];

            uploadedFiles.forEach((file, fileIndex) => {
                formData.append(`${inputName}_name_${fileIndex}`, file.name);
                formData.append(`${inputName}_type_${fileIndex}`, file.type);
                formData.append(`${inputName}_data_${fileIndex}`, file.data);
            });

            formData.append(`${inputName}_count`, uploadedFiles.length);
        });

        const formDataObj = Object.fromEntries(formData.entries());
        const body = JSON.stringify(formDataObj);

        console.log('Sending form data:', formDataObj);
        // return;

        fetch(action, {
            method: 'POST',
            redirect: "follow",
            headers: {
                'Content-Type': 'text/plain;charset=utf-8'
            },
            body: body
        })
            .then(response => response.json())
            .then(result => {
                console.log('Success:', result);
                if (!result) return;
                if (result.success) {
                    formWrapper.find('.form-header').css('display', 'none');
                    formWrapper.find('.form-inner').css('display', 'none');
                    formWrapper.find('.form-response-message').css('display', 'block');
                    scrollTo(formWrapper.find('.form-response-message'));
                } else {
                    validation.showError(formWrapper, result.field);
                    scrollTo(formWrapper.find(`.${result.field}-form-group`));
                }
            })
            .catch(error => {
                if (!error) return;
                console.error('Error:', error);
                validation.showError(self, error.field);
                scrollTo(self.find(`.${error.field}-form-group`));
            }).finally(() => {
                button.disabled = false;
                formWrapper.spinner().stop();
            });
    });
}

$(document).ready(function () {
    const customForm = $('form.custom-form-element');
    if (customForm.length) {
        customForm.each(function () {
            console.log('Initializing custom form:', $(this).attr('id'));
        });
        validation.initialize(customForm);
        handleFileUpload();
        initAllCustomForm();
    }
});
