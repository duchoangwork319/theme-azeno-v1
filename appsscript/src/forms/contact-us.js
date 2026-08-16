import config from "./config/contact-us-config.json";
import { createTextOutput } from "../core/response.js";
import { sendMail } from "../core/mailer.js";

export const formType = "contact-us";
export const fieldConfig = config;

/**
 * Handles the submission of the contact form.
 * @param {Object} formData - The form data submitted by the user.
 * @param {Object} config - The configuration for the contact us form.
 * @returns {ContentService.TextOutput} - The JSON response.
 */
export function handle(formData, config) {
  const spreadsheetId = config.CONTACT_US_SPREADSHEET_ID;
  if (!spreadsheetId) {
    throw new Error("Contact Us Spreadsheet ID not set in script properties.");
  }
  const sheet = SpreadsheetApp.openById(spreadsheetId);
  if (!sheet) {
    throw new Error("Sheet 'Contact Us' not found.");
  }
  const timestamp = new Date();
  const fullPhoneNumber = formData.phoneNumber_country + formData.phoneNumber;
  sheet.appendRow([
    timestamp,
    formData.name,
    formData.email,
    fullPhoneNumber,
    formData.helpWith,
    formData.orderNo,
    formData.shippingToCountry,
    formData.message
  ]);
  if (config.MAIL_ENABLE) {
    sendMail({
      subject: "Notifications: New Contact Us Form Submission",
      recipient: config.MAIL_RECIPIENT,
      message: `A new message has been submitted through your website's Contact Us form. Please follow up with the customer as soon as possible.<br/><br/><strong>Request Details:</strong><br/>- Name: {{name}}<br/>- Email: {{email}}<br/>- Phone: {{phoneNumber}}<br/>- Need help with: {{helpWith}}<br/>- Order: {{orderNo}}<br/>- Shipping to country: {{shippingToCountry}}<br/>- Message: {{message}}`,
      content: {
        name: formData.name,
        email: formData.email,
        phoneNumber: fullPhoneNumber,
        helpWith: formData.helpWith,
        orderNo: formData.orderNo,
        shippingToCountry: formData.shippingToCountry,
        message: formData.message
      }
    });
  }
  return createTextOutput(null, true, "Contact us form submitted successfully.");
}
