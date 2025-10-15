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

        const form = $(this);
        const button = form.find('button[type="submit"]').get(0);
        const action = form.attr('action') || '';
        const method = (form.attr('method') || 'POST').toUpperCase();
        const formData = new FormData(form[0], button);
        const formWrapper = form.parents('.form-wrapper');

        button.disabled = true;
        form.find('.invalid-message').css('display', 'none');
        formWrapper.spinner().start();

        const fileInputs = Array.from($('input[type="file"]', form));

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

        // console.log('Sending form data:', formDataObj);

        const done = result => {
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
        };

        const fail = error => {
            if (!error) return;
            console.error('Error:', error);
            validation.showError(form, error.field);
            scrollTo(form.find(`.${error.field}-form-group`));
        };

        const always = () => {
            button.disabled = false;
            formWrapper.spinner().stop();
        };

        // fetch(action, {
        //     method: method,
        //     redirect: "follow",
        //     headers: {
        //         'Content-Type': 'text/plain;charset=utf-8'
        //     },
        //     body: body
        // })
        //     .then(response => response.json())
        //     .then(done)
        //     .catch(fail)
        //     .finally(always);

        $.ajax({
            url: action,
            method: method,
            contentType: 'text/plain;charset=utf-8',
            data: body
        }).done(done)
            .fail(error => {
                console.error('AJAX error:', error);
                try {
                    const json = JSON.parse(error.responseText);
                    fail(json);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            })
            .always(always);
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

    if (!customForm.length) return;

    customForm.each(function () {
        console.log('Initializing custom form:', $(this).attr('id'));
    });

    validation.initialize(customForm);
    file.initFileUploadListener(customForm);
    initAllCustomForm();
    fillFormWithFakeData(customForm);
});
