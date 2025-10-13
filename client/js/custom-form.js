'use strict';

import validation from './components/validation.js';
import file from './components/file.js';

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

/**
 * Fills the form with fake data
 * @param {jQuery<HTMLElement>} form - jQuery object of the form to be filled
 */
function fillFormWithFakeData(form) {
    form.find('#fillFakeDataButton').on('click', function () {
        if (window.FK && typeof window.FK.fakeForm === 'function') {
            window.FK.fakeForm(form);
        }
    });
}

$(document).ready(function () {
    const customForm = $('form.custom-form-element');
    if (customForm.length) {
        customForm.each(function () {
            console.log('Initializing custom form:', $(this).attr('id'));
        });
        validation.initialize(customForm);
        file.initFileUploadListener(customForm);
        initAllCustomForm();
        fillFormWithFakeData(customForm);
    }
});
