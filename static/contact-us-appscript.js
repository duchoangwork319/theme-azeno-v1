function doPost(e) {
  try {
    // Get the active spreadsheet and the target sheet by name
    const sheet = SpreadsheetApp.openById('17QP8dcGKbqdgSP5FZqQ1nkK22xDTI32uR5gkuTYXtJo');

    // Check if the sheet exists
    if (!sheet) {
      throw new Error("Sheet 'Contact Us' not found.");
    }

    const input = JSON.parse(e.postData.contents);
    // Extract form data from the input object
    const name = input.name;
    const email = input.email;
    const phoneNumber = input.phoneNumber;
    const helpWith = input.helpWith;
    const orderNo = input.orderNo;
    const shippingToCountry = input.shippingToCountry;
    const message = input.message;

    // Validation
    if (!name || name.length > 50) {
      return ContentService.createTextOutput(JSON.stringify({
        field: "name",
        success: false,
        message: "Invalid input: 'name' is required and must not exceed 50 characters."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.length > 100 || !emailRegex.test(email)) {
      return ContentService.createTextOutput(JSON.stringify({
        field: "email",
        success: false,
        message: "Invalid input: 'email' is required, must not exceed 100 characters, and must be a valid email address."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    if (!phoneNumber || phoneNumber.length > 50) {
      return ContentService.createTextOutput(JSON.stringify({
        field: "phoneNumber",
        success: false,
        message: "Invalid input: 'phoneNumber' is required and must not exceed 50 characters."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    if (!helpWith || helpWith.length > 50) {
      return ContentService.createTextOutput(JSON.stringify({
        field: "helpWith",
        success: false,
        message: "Invalid input: 'helpWith' is required and must not exceed 50 characters."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    if (!orderNo || orderNo.length > 50) {
      return ContentService.createTextOutput(JSON.stringify({
        field: "orderNo",
        success: false,
        message: "Invalid input: 'orderNo' is required and must not exceed 50 characters."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    if (!shippingToCountry || shippingToCountry.length > 50) {
      return ContentService.createTextOutput(JSON.stringify({
        field: "shippingToCountry",
        success: false,
        message: "Invalid input: 'shippingToCountry' is required and must not exceed 50 characters."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    if (!message || message.length > 255) {
      return ContentService.createTextOutput(JSON.stringify({
        field: "message",
        success: false,
        message: "Invalid input: 'message' is required and must not exceed 255 characters."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Get the current timestamp
    const timestamp = new Date();

    // Create an array with the data in the correct order
    const rowData = [
      timestamp, // Add a timestamp for when the form was submitted
      name,
      email,
      phoneNumber,
      helpWith,
      orderNo,
      shippingToCountry,
      message
    ];

    // Append the new row to the sheet
    sheet.appendRow(rowData);

    // Return a JSON success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Form submitted successfully!"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log the error for debugging
    Logger.log("Error during doPost: " + error.message);

    // Return a JSON error response
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: "An error occurred during submission: " + error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
