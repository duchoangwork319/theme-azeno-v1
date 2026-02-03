'use strict';

/**
 * Loads the Google reCAPTCHA script asynchronously
 * @returns {Promise<void>} - A promise that resolves when the script is loaded
 */
export function loadRecaptcha() {
  return new Promise((resolve) => {
    if (typeof grecaptcha !== 'undefined') {
      return resolve();
    }
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=explicit&hl=en`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    script.onload = () => resolve();
  });
}

/**
 * Renders the reCAPTCHA widget inside the specified form element
 * @param {jQuery<HTMLElement>} formEl - The form element to render the reCAPTCHA in
 * @returns {void}
 */
export function renderRecaptcha(formEl) {
  if (typeof grecaptcha === 'undefined') {
    throw new Error('reCAPTCHA is not loaded.');
  }
  const widgetEl = formEl.find('.g-recaptcha');
  const checkbox = formEl.find('#gRecaptchaCheckbox');

  grecaptcha.ready(() => {
    grecaptcha.render(widgetEl.get(0), {
      sitekey: widgetEl.data('sitekey'),
      size: 'normal',
      callback: () => {
        checkbox.prop('checked', true);
        console.log('reCAPTCHA completed successfully.');
      },
      'expired-callback': () => {
        checkbox.prop('checked', false);
        console.log('reCAPTCHA expired. Please complete it again.');
      },
      'error-callback': () => {
        checkbox.prop('checked', false);
        console.log('An error occurred with reCAPTCHA. Please try again.');
      }
    });
  })
}