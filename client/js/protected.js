"use strict";

import { SHA256, HmacSHA256, HmacSHA1 } from "crypto-js";

/**
 * Initializes the protected form submission handling
 * @param {JQuery<HTMLElement>} form - The protected form element
 */
function initProtectedForm(form) {
  form.on("submit", function (e) {
    e.preventDefault();

    const hideError = () => $("[data-error-message]", self).removeClass("d-block");
    const showError = () => $("[data-error-message]", self).addClass("d-block");
    const showSuccess = () => $("[data-success-message]", self).addClass("d-block");

    hideError();

    const self = $(this);
    const ID = $("[name=collection_id]", self).val();
    const handle = $("[name=collection_handle]", self).val();
    const password = $("[name=password]", self).val();
    const token = $("[name=token]", self).val();
    const path = $("[name=collection_url]", self).val();
    const hashPassword = SHA256(password).toString();
    const hmac256 = HmacSHA256(handle + ID, hashPassword).toString();
    const newUrl = new URL(
      String(Shopify.routes.root + path).replace(/\//g, " ").replace(/\s+/g, "/"),
      location.origin
    );

    // Compare hmac with token
    if (hmac256 === token) {
      showSuccess();
      setTimeout(() => {
        const hmac1 = HmacSHA1(handle + ID, hashPassword).toString();
        newUrl.searchParams.append("q", hmac1);
        window.location.href = newUrl.toString();
      });
    } else showError();
  });
}

$(function () {
  initProtectedForm($("protected-form form"));
});
