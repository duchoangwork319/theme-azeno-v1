import config from "./config/warranty-config.json";
import { createTextOutput } from "../core/response.js";
import { sendMail } from "../core/mailer.js";
import { processFileUploads, uploadFiles, createAddOnMessageSection } from "../core/fileUpload.js";

export const formType = "warranty";
export const fieldConfig = config;

/**
 * Handles the submission of the warranty form.
 * @param {Object} formData - The form data submitted by the user.
 * @param {Object} config - The configuration for the warranty form.
 * @returns {ContentService.TextOutput} - The JSON response.
 */
export function handle(formData, config) {
  const spreadsheetId = config.WARRANTY_SPREADSHEET_ID;
  if (!spreadsheetId) {
    throw new Error("Spreadsheet ID not set in script properties.");
  }
  const folderId = config.WARRANTY_FOLDER_ID;
  if (!folderId) {
    throw new Error("Folder ID not set in script properties.");
  }
  const sheet = SpreadsheetApp.openById(spreadsheetId);
  if (!sheet) {
    throw new Error("Sheet 'Warranty' not found.");
  }
  const folder = DriveApp.getFolderById(folderId);
  if (!folder) {
    throw new Error("Folder not found.");
  }

  const warrantyBlobs = processFileUploads(formData, 'warrantyFile', config.fileUploads.warrantyFile);

  if (!warrantyBlobs.success) return warrantyBlobs.textOutput;

  const warrantyUploadedFiles = uploadFiles(folder, warrantyBlobs.blobs);
  const timestamp = new Date();
  const fullPhoneNumber = formData.phoneNumber_country + formData.phoneNumber;
  sheet.appendRow([
    timestamp,
    formData.orderNo,
    formData.email,
    formData.productModelNo,
    formData.name,
    formData.address,
    formData.zipCity,
    formData.complaint,
    formData.message,
    formData.area,
    fullPhoneNumber,
    warrantyUploadedFiles.map(file => file.fileUrl).join(', ')
  ]);

  let addOnMessage = createAddOnMessageSection("Product Files", warrantyUploadedFiles);

  if (config.MAIL_ENABLE) {
    sendMail({
      subject: "Notifications: New Warranty Form Submission",
      recipient: config.MAIL_RECIPIENT,
      message: `A new warranty request has been submitted through your website. Please follow up with the customer as soon as possible.<br/><br/><strong>Request Details:</strong><br/>- Name: {{name}}<br/>- Email: {{email}}<br/>- Phone: {{phoneNumber}}<br/>- Order No: {{orderNo}}<br/>- Product Model No: {{productModelNo}}<br/>- Complaint: {{complaint}}<br/>- Message: {{message}}<br/>- Area: {{area}}<br/>- Address: {{address}}<br/>- Zip/City: {{zipCity}}<br/>{{addOnMessage}}`,
      content: {
        name: formData.name,
        email: formData.email,
        phoneNumber: fullPhoneNumber,
        orderNo: formData.orderNo,
        productModelNo: formData.productModelNo,
        complaint: formData.complaint,
        message: formData.message,
        area: formData.area,
        address: formData.address,
        zipCity: formData.zipCity,
        addOnMessage: addOnMessage
      }
    });
  }

  return createTextOutput(null, true, "Warranty form submitted successfully.");
}
