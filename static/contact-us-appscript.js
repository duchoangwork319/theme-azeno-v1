function createTextOutput(field, success, message) {
  return ContentService.createTextOutput(JSON.stringify({
    field: field,
    success: success,
    message: message
  })).setMimeType(ContentService.MimeType.JSON);
}

function sendMail(data) {
  const scriptProperties = PropertiesService.getScriptProperties();
  const enable = scriptProperties.getProperty('MAIL_ENABLE');
  const recipient = scriptProperties.getProperty('MAIL_RECIPIENT');
  const subject = scriptProperties.getProperty('MAIL_SUBJECT') || "New Contact Form Submission";
  let message = scriptProperties.getProperty('MAIL_MESSAGE');

  if (enable !== 'true') {
    return;
  }
  if (!recipient || !subject || !message) {
    throw new Error("Mail recipient, subject, or message not set in script properties.");
  }

  Object.keys(data).forEach(key => {
    const placeholder = `{{${key}}}`;
    message = message.replace(new RegExp(placeholder, 'g'), data[key]);
  });

  MailApp.sendEmail(
    recipient,
    subject,
    '', // Plain text body (empty since we're using HTML body)
    {
      name: 'Form Notifications',
      noReply: true,
      htmlBody: message
    }
  );
}

function doPost(e) {
  try {
    const scriptProperties = PropertiesService.getScriptProperties();
    const spreadsheetId = scriptProperties.getProperty('SPREADSHEET_ID');
    if (!spreadsheetId) {
      throw new Error("Spreadsheet ID not set in script properties.");
    }

    const sheet = SpreadsheetApp.openById(spreadsheetId);
    if (!sheet) {
      throw new Error("Sheet 'Contact Us' not found.");
    }

    const formData = JSON.parse(e.postData.contents);
    const name = formData.name;
    const email = formData.email;
    const phoneCountry = formData.phoneNumber_country || '';
    const phoneNumber = formData.phoneNumber;
    const helpWith = formData.helpWith;
    const orderNo = formData.orderNo;
    const shippingToCountry = formData.shippingToCountry;
    const message = formData.message;
    const fullPhoneNumber = phoneCountry + phoneNumber;

    // Validation
    if (!name || name.length > 50) {
      return createTextOutput("name", false, "Invalid input: 'Name' is required and must not exceed 50 characters.");
    }

    const emailRegex = /[a-z0-9._\%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/;
    if (!email || email.length > 100 || !emailRegex.test(email)) {
      return createTextOutput("email", false, "Invalid input: 'Email' is required, must not exceed 100 characters, and must be a valid email address.");
    }

    const phoneCountryRegex = /^\+\d+$/;
    if (phoneCountry && !phoneCountryRegex.test(phoneCountry)) {
      return createTextOutput("phoneNumber", false, "Invalid input: 'Phone Country' must start with '+' followed by numbers.");
    }

    if (!phoneNumber || phoneNumber.length > 15) {
      return createTextOutput("phoneNumber", false, "Invalid input: 'Phone Number' is required and must not exceed 15 characters.");
    }

    if (!helpWith || helpWith.length > 50) {
      return createTextOutput("helpWith", false, "Invalid input: 'What can we help you with?' is required and must not exceed 50 characters.");
    }

    if (!orderNo || orderNo.length > 50) {
      return createTextOutput("orderNo", false, "Invalid input: 'Order #' is required and must not exceed 50 characters.");
    }

    if (!shippingToCountry || shippingToCountry.length > 50) {
      return createTextOutput("shippingToCountry", false, "Invalid input: 'Shipping To Country' is required and must not exceed 50 characters.");
    }

    if (!message || message.length > 255) {
      return createTextOutput("message", false, "Invalid input: 'Message' is required and must not exceed 255 characters.");
    }

    // Get the current timestamp
    const timestamp = new Date();

    // Create an array with the data in the correct order
    const rowData = [
      timestamp, // Add a timestamp for when the form was submitted
      name,
      email,
      fullPhoneNumber,
      helpWith,
      orderNo,
      shippingToCountry,
      message
    ];

    // Append the new row to the sheet
    sheet.appendRow(rowData);

    // Send notification email
    sendMail({
      name: name,
      email: email,
      phoneNumber: fullPhoneNumber
    });

    // Return a JSON success response
    return createTextOutput(null, true, "Form submitted successfully.");

  } catch (error) {
    // Log the error for debugging
    Logger.log("Error during doPost: " + error.message);

    // Return a JSON error response
    return createTextOutput(null, false, "An error occurred: " + error.message);
  }
}
