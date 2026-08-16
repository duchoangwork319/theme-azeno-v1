import config from "./config/desaru-finisher-reward-config.json";
import { createTextOutput } from "../core/response.js";
import { sendMail } from "../core/mailer.js";
import { processFileUploads, uploadFiles, createAddOnMessageSection } from "../core/fileUpload.js";

export const formType = "desaru_finisher_reward";
export const fieldConfig = config;

/**
 * Handles the submission of the Desaru finisher reward form.
 * @param {Object} formData - The form data submitted by the user.
 * @param {Object} config - The configuration for the Desaru finisher reward form.
 * @returns {ContentService.TextOutput} - The JSON response.
 */
export function handle(formData, config) {
  const spreadsheetId = config.DESARU_FINISHER_REWARD_SPREADSHEET_ID;
  if (!spreadsheetId) {
    throw new Error("Spreadsheet ID not set in script properties.");
  }
  const folderId = config.DESARU_FINISHER_REWARD_FOLDER_ID;
  if (!folderId) {
    throw new Error("Folder ID not set in script properties.");
  }
  const sheet = SpreadsheetApp.openById(spreadsheetId);
  if (!sheet) {
    throw new Error("Sheet 'Desaru Finisher Reward' not found.");
  }
  const folder = DriveApp.getFolderById(folderId);
  if (!folder) {
    throw new Error("Folder not found.");
  }

  const proofBlobs = processFileUploads(formData, 'proofOfParticipation', config.fileUploads.proofOfParticipation);

  if (!proofBlobs.success) return proofBlobs.textOutput;

  const attachmentBlobs = processFileUploads(formData, 'attachmentFile', config.fileUploads.attachmentFile);

  if (!attachmentBlobs.success) return attachmentBlobs.textOutput;

  const proofFiles = uploadFiles(folder, proofBlobs.blobs);
  const attachmentFiles = uploadFiles(folder, attachmentBlobs.blobs);

  const timestamp = new Date();
  const fullPhoneNumber = formData.phoneNumber_country + formData.phoneNumber;
  sheet.appendRow([
    timestamp,
    formData.firstName,
    formData.lastName,
    formData.email,
    formData.countryRegion,
    formData.desaruRaceCategory,
    formData.nextRace,
    formData.genderProductPreference,
    formData.clubOrCoach,
    fullPhoneNumber,
    formData.privacyAcknowledgement,
    formData.emailConsent,
    proofFiles.map(file => file.fileUrl).join(', '),
    attachmentFiles.map(file => file.fileUrl).join(', ')
  ]);

  const addOnMessage1 = createAddOnMessageSection("Proof of Participation", proofFiles);
  const addOnMessage2 = createAddOnMessageSection("Attachments", attachmentFiles);
  const addOnMessage = addOnMessage1 + addOnMessage2;

  if (config.MAIL_ENABLE) {
    sendMail({
      subject: "Notifications: New Desaru Finisher Reward Form Submission",
      recipient: config.MAIL_RECIPIENT,
      message: `A new Desaru finisher reward request has been submitted through your website. Please follow up with the customer as soon as possible.<br/><br/><strong>Request Details:</strong><br/>- First Name: {{firstName}}<br/>- Last Name: {{lastName}}<br/>- Email: {{email}}<br/>- Phone: {{phoneNumber}}<br/>- Country/Region: {{countryRegion}}<br/>- Desaru Race Category: {{raceCategory}}<br/>- Next Race: {{nextRace}}<br/>- Gender / Product Preference: {{genderPreference}}<br/>- Club or Coach: {{clubOrCoach}}<br/>{{addOnMessage}}`,
      content: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: fullPhoneNumber,
        countryRegion: formData.countryRegion,
        raceCategory: formData.desaruRaceCategory,
        nextRace: formData.nextRace,
        genderPreference: formData.genderProductPreference,
        clubOrCoach: formData.clubOrCoach,
        addOnMessage: addOnMessage
      }
    });
  }

  return createTextOutput(null, true, "Desaru finisher reward form submitted successfully.");
}
