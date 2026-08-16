/**
 * Creates a JSON response for the contact form submission.
 * @param {string} field - The field that caused the error (if any).
 * @param {boolean} success - Whether the operation was successful.
 * @param {string} message - The message to include in the response.
 * @param {Object|null} addition - Additional data to include in the response.
 * @returns {ContentService.TextOutput} - The JSON response.
 */
export function createTextOutput(field, success, message, addition = null) {
  return ContentService.createTextOutput(JSON.stringify({
    field: field,
    success: success,
    message: message,
    addition: addition
  })).setMimeType(ContentService.MimeType.JSON);
}
