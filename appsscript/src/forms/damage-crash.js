import config from "./config/damage-crash-config.json";
import { createTextOutput } from "../core/response.js";
import { sendMail } from "../core/mailer.js";
import { processFileUploads, uploadFiles, createAddOnMessageSection } from "../core/fileUpload.js";

export const formType = "damage-crash";
export const fieldConfig = config;

/**
 * Handles the submission of the damage crash form.
 * @param {Object} formData - The form data submitted by the user.
 * @param {Object} config - The configuration for the damage crash form.
 * @returns {ContentService.TextOutput} - The JSON response.
 */
export function handle(formData, config) {
  const spreadsheetId = config.DAMAGE_CRASH_SPREADSHEET_ID;
  if (!spreadsheetId) {
    throw new Error("Spreadsheet ID not set in script properties.");
  }
  const folderId = config.DAMAGE_CRASH_FOLDER_ID;
  if (!folderId) {
    throw new Error("Folder ID not set in script properties.");
  }
  const sheet = SpreadsheetApp.openById(spreadsheetId);
  if (!sheet) {
    throw new Error("Sheet 'Crash Damage' not found.");
  }
  const folder = DriveApp.getFolderById(folderId);
  if (!folder) {
    throw new Error("Folder not found.");
  }

  const dmgCrashProdBlobs = processFileUploads(formData, 'dmgCrashProdFile', config.fileUploads.dmgCrashProdFile);

  if (!dmgCrashProdBlobs.success) return dmgCrashProdBlobs.textOutput;

  const dmgCrashAttachmentBlobs = processFileUploads(formData, 'dmgCrashAttachmentFile', config.fileUploads.dmgCrashAttachmentFile);

  if (!dmgCrashAttachmentBlobs.success) return dmgCrashAttachmentBlobs.textOutput;

  const dmgCrashProdFiles = uploadFiles(folder, dmgCrashProdBlobs.blobs);
  const dmgCrashAttachmentFiles = uploadFiles(folder, dmgCrashAttachmentBlobs.blobs);

  const timestamp = new Date();
  const fullPhoneNumber = formData.phoneNumber_country + formData.phoneNumber;
  sheet.appendRow([
    timestamp,
    formData.email,
    formData.productModelNo,
    formData.size,
    formData.name,
    formData.address,
    formData.zipCity,
    formData.area,
    fullPhoneNumber,
    formData.message,
    dmgCrashProdFiles.map(file => file.fileUrl).join(', '),
    dmgCrashAttachmentFiles.map(file => file.fileUrl).join(', ')
  ]);

  const addOnMessage1 = createAddOnMessageSection("Product Files", dmgCrashProdFiles);
  const addOnMessage2 = createAddOnMessageSection("Attachment Files", dmgCrashAttachmentFiles);
  const addOnMessage = addOnMessage1 + addOnMessage2;

  if (config.MAIL_ENABLE) {
    sendMail({
      subject: "Notifications: New Damage and Crash Replacement Form Submission",
      recipient: config.MAIL_RECIPIENT,
      message: `A new damage and crash replacement request has been submitted through your website. Please follow up with the customer as soon as possible.<br/><br/><strong>Request Details:</strong><br/>- Name: {{name}}<br/>- Email: {{email}}<br/>- Phone: {{phoneNumber}}<br/>- Product Model No: {{productModelNo}}<br/>- Size: {{size}}<br/>- Address: {{address}}<br/>- Zip/City: {{zipCity}}<br/>- Area: {{area}}<br/>- Message: {{message}}<br/>{{addOnMessage}}`,
      content: {
        name: formData.name,
        email: formData.email,
        phoneNumber: fullPhoneNumber,
        productModelNo: formData.productModelNo,
        size: formData.size,
        area: formData.area,
        address: formData.address,
        zipCity: formData.zipCity,
        message: formData.message,
        addOnMessage: addOnMessage
      }
    });
  }

  return createTextOutput(null, true, "Crash damage form submitted successfully.");
}
