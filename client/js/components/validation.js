'use strict';

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
 * Validate whole form. Requires `this` to be set to form object
 * @param {jQuery.event} event - Event to be canceled if form is invalid.
 * @returns {boolean} - Flag to indicate if form is valid
 */
function validateForm(event) {
  let valid = true;
  let hasStop = false;
  const formElement = $(this);
  const stop = () => {
    if (hasStop) return;
    if (event) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    }
    hasStop = true;
    valid = false;
  };

  if (this.checkValidity && !this.checkValidity()) {
    stop();
    formElement.find('input:not([type="file"]), select, textarea').each(function () {
      if (!this.validity.valid) {
        $(this).trigger('invalid', this.validity);
      }
    });
  }

  formElement.find('input[type="file"]').each(function () {
    const fileInput = $(this);
    const validation = validateFileInput(fileInput);
    if (!validation.valid) {
      stop();
      showError(formElement, fileInput.attr('name').replace('[]', ''));
    }
  });

  return valid;
}

/**
 * Shows an error message for a specific field and scrolls to it
 * @param {jQuery<HTMLElement>} wrapper - The form wrapper element
 * @param {string} field - The name of the field
 */
export function showError(wrapper, field) {
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
export function initValidation(formElement) {
  submit(formElement);
  invalid(formElement);
  clearForm(formElement);
}
