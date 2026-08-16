import { createTextOutput } from "./response.js";

/**
 * Validates the form data against the provided configuration.
 * @param {Object} formData - The form data submitted by the user.
 * @param {Object} config - The validation configuration.
 * @returns {ContentService.TextOutput|null} - The JSON response if validation fails, or null if it passes.
 */
export function validateFormData(formData, config) {
  for (const key in formData) {
    if (!config.fields[key]) {
      continue;
    }

    const fieldConfig = config.fields[key];
    const value = formData[key];

    if (fieldConfig.required && (!value || value.trim() === "")) {
      return createTextOutput(key, false, fieldConfig.defaultMessage);
    }
    if (fieldConfig.maxlength && value.length > fieldConfig.maxlength) {
      return createTextOutput(key, false, fieldConfig.defaultMessage);
    }
    if (fieldConfig.pattern && !new RegExp(fieldConfig.pattern).test(value)) {
      return createTextOutput(key, false, fieldConfig.defaultMessage);
    }
  }
  return null;
}
