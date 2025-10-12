'use strict';

/**
 * Validate whole form. Requires `this` to be set to form object
 * @param {jQuery.event} event - Event to be canceled if form is invalid.
 * @returns {boolean} - Flag to indicate if form is valid
 */
function validateForm(event) {
    let valid = true;
    if (this.checkValidity && !this.checkValidity()) {
        valid = false;
        if (event) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
        }
        $(this).find('input, select, textarea').each(function () {
            if (!this.validity.valid) {
                $(this).trigger('invalid', this.validity);
            }
        });
    }
    return valid;
}

/**
 * Shows an error message for a specific field and scrolls to it
 * @param {jQuery<HTMLElement>} wrapper - The form wrapper element
 * @param {string} field - The name of the field
 */
function showError(wrapper, field) {
    const fieldElement = wrapper.find(`.${field}-form-group`);
    if (fieldElement.length) {
        fieldElement.find('.invalid-message').css('display', 'block');
    }
}

/**
 * Initialize validation for form element
 * @param {JQuery<HTMLElement>} formElement - Form to initialize
 */
function invalid(formElement) {
    formElement.find('input, select, textarea').on('invalid', function (e) {
        e.preventDefault();
        this.setCustomValidity('');
        if (!this.validity.valid) {
            let self = $(this);
            self.addClass('invalid');
            showError(formElement, self.attr('name'));
        }
    });
}

/**
 * Initialize clearing validation errors for form element
 * @param {JQuery<HTMLElement>} formElement - Form to clear
 */
function submit(formElement) {
    formElement.on('submit', function (e) {
        return validateForm.call(this, e);
    });
}

/**
 * Clear all validation errors when user interacts with the form
 * @param {JQuery<HTMLElement>} formElement - Form to clear
 */
function clearForm(formElement) {
    formElement.find('button[type="submit"], input[type="submit"]').on('click', function () {
        formElement.find('.form-control.invalid').removeClass('invalid');
        formElement.find('.invalid-message').css('display', 'none');
    });
}

/**
 * Initialize validation for form element
 * @param {JQuery<HTMLElement>} formElement - Form to initialize
 */
function initialize(formElement) {
    submit(formElement);
    invalid(formElement);
    clearForm(formElement);
}

export default {
    initialize,
    showError
};
