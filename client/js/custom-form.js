"use strict";

import { initValidation, showError } from "./components/validation.js";
import { appendToFormData, initFileInput } from "./components/file.js";
import { safeJsonParse, scrollTo } from "./components/helpers.js";
import { loadRecaptcha, renderRecaptcha, resetRecaptcha } from "./components/grecaptcha.js";

/**
 * Initializes form submission handling for all custom forms
 * @param {JQuery<HTMLElement>} formElement - The form element containing the file input
 */
function initSubmitHandler(formElement) {
  formElement.on("submit", function (e) {
    e.preventDefault();

    const form = $(this);
    const button = form.find("button[type=\"submit\"]").get(0);
    const action = form.attr("action") || "";
    const method = (form.attr("method") || "POST").toUpperCase();
    const formData = new FormData(form[0], button);
    const formWrapper = form.parents(".form-wrapper");

    button.disabled = true;
    form.find(".invalid-message").css("display", "none");
    formWrapper.spinner().start();

    appendToFormData(formData, $("input[type=\"file\"]", form));

    const formDataObj = Object.fromEntries(formData.entries());
    const body = JSON.stringify(formDataObj);

    const done = (result) => {
      console.log("Success:", result);
      if (!result) return;
      if (result.success) {
        formWrapper.find(".form-header").css("display", "none");
        formWrapper.find(".form-inner").css("display", "none");
        formWrapper.find(".form-response-message").css("display", "block");
        scrollTo(formWrapper.find(".form-response-message"));
      } else {
        showError(formWrapper, result.field);
        scrollTo(formWrapper.find(`.${result.field}-form-group`));
      }
    };

    const fail = (error) => {
      if (!error) return;
      console.error("Error:", error);
      showError(form, error.field);
      scrollTo(form.find(`.${error.field}-form-group`));
    };

    const always = () => {
      button.disabled = false;
      formWrapper.spinner().stop();
    };

    $.ajax({
      url: action,
      method: method,
      contentType: "text/plain;charset=utf-8",
      data: body
    }).done(done)
      .fail(error => {
        console.error("AJAX error:", error);
        const json = safeJsonParse(error.responseText);
        fail(json);
        resetRecaptcha();
      })
      .always(always);
  });
}

$(function () {
  $("form.custom-form-element").each(function () {
    const form = $(this);
    console.log("Initializing custom form:", form.attr("id"));
    initValidation(form);
    initFileInput(form);
    initSubmitHandler(form);
    loadRecaptcha().then(() => {
      renderRecaptcha(form);
    });
  });
});
