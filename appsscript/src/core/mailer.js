/**
 * Sends an email notification.
 * @param {Object} data - The data to include in the email.
 * @returns {void}
 */
export function sendMail(data) {
  const recipient = data.recipient;
  const subject = data.subject;
  let message = data.message;

  if (!recipient || !subject || !message) {
    Logger.log("Mail recipient, subject, or message not set in script properties.");
    return;
  }

  if (data.content) {
    Object.keys(data.content).forEach(key => {
      message = message.replace(new RegExp(`{{${key}}}`, 'g'), data.content[key]);
    });
  }

  MailApp.sendEmail(
    recipient,
    subject,
    '', // Plain text body (empty since we're using HTML body)
    {
      name: 'Notifications',
      noReply: true,
      htmlBody: message
    }
  );
}
