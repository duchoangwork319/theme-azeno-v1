/**
 * Safely parses a JSON string
 * @param {string} text - The JSON string to parse
 * @returns {Object|null} The parsed object or null if parsing fails
 */
export function safeJsonParse(text) {
  try {
    const json = JSON.parse(text);
    return json;
  } catch (error) {
    Logger.log("Error during safeJsonParse: " + error.message);
  }
  return null;
}

/**
 * Verifies the reCAPTCHA token.
 * @param {string} token - The reCAPTCHA token to verify.
 * @param {Object} config - The configuration object containing reCAPTCHA settings.
 * @returns {boolean} - Whether the reCAPTCHA token is valid.
 */
export function verifyRecaptcha(token, config) {
  if (!config.RECAPTCHA_ENABLE) return true;

  const secret = config.RECAPTCHA_SECRETKEY;
  if (!secret) {
    throw new Error("reCAPTCHA secret key is invalid.");
  }
  const url = 'https://www.google.com/recaptcha/api/siteverify';
  const options = {
    method: 'post',
    payload: {
      secret: secret,
      response: token
    }
  };

  const response = UrlFetchApp.fetch(url, options);
  const data = safeJsonParse(response.getContentText());

  return {
    success: data && data.success === true,
    errorCodes: data && data['error-codes'] ? data['error-codes'] : 'na'
  };
}
