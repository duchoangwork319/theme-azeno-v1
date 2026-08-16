import { createTextOutput } from "./core/response.js";
import { getScriptConfig } from "./core/scriptConfig.js";
import { validateFormData } from "./core/validation.js";
import { verifyRecaptcha } from "./core/recaptcha.js";
import * as contactUs from "./forms/contact-us.js";
import * as warranty from "./forms/warranty.js";
import * as damageCrash from "./forms/damage-crash.js";
import * as desaruFinisherReward from "./forms/desaru-finisher-reward.js";

const forms = [contactUs, warranty, damageCrash, desaruFinisherReward];
const formsByType = Object.fromEntries(forms.map(form => [form.formType, form]));

function doPost(e) {
  try {
    const formData = JSON.parse(e.postData.contents);
    const formType = formData.formType;
    const form = formsByType[formType];

    if (!form) {
      return createTextOutput(null, false, "Invalid or missing form type.");
    }

    const scriptCfg = getScriptConfig();

    const result = verifyRecaptcha(formData['g-recaptcha-response'], scriptCfg);
    if (!result.success) {
      return createTextOutput(null, false, "reCAPTCHA verification failed.", { errorCodes: result.errorCodes });
    }

    const cfg = Object.assign({}, scriptCfg, form.fieldConfig);
    const validationError = validateFormData(formData, cfg);
    if (validationError) {
      return validationError;
    }

    return form.handle(formData, cfg);
  } catch (error) {
    Logger.log("Error during doPost: " + error.message);
    return createTextOutput(null, false, "An error occurred: " + error.message);
  }
}

// GAS invokes doPost as a bare global function; the IIFE bundle format would
// otherwise trap it inside the closure, so it must be attached explicitly.
globalThis.doPost = doPost;
