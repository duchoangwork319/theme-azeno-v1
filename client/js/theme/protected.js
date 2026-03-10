"use strict";

import { SHA256, HmacSHA256, HmacSHA1 } from "crypto-js";
import { converToQueryString, getQueryStringParams } from "../components/helpers";

/**
 * Sets the session storage with the provided HMAC and SHA256 values
 * @param {string} hmac1 - The HMAC value to be stored in session storage
 * @param {string} sha256 - The SHA256 value to be stored in session storage
 */
function setSession(hmac1, sha256) {
  sessionStorage.setItem("ss_p_hmac1", hmac1);
  sessionStorage.setItem("ss_p_sha256", sha256);
}

/**
 * Clears the session storage of the protected form values
 */
function clearSession() {
  sessionStorage.removeItem("ss_p_hmac1");
  sessionStorage.removeItem("ss_p_sha256");
}

/**
 * Validates the protected form submission
 * @param {jQuery<HTMLFormElement>} form - The jQuery object representing the protected form
 * @param {string} hashPassword - The hashed password to compare against the token
 * @return {boolean} - Returns true if validation is successful, false otherwise
 */
function validate(form, hashPassword) {
  if (!form || !hashPassword) return false;

  const hideError = () => $("[data-error-message]", form).removeClass("d-block");
  const showError = () => $("[data-error-message]", form).addClass("d-block");
  const showSuccess = () => $("[data-success-message]", form).addClass("d-block");

  hideError();

  const ID = $("[name=collection_id]", form).val();
  const handle = $("[name=collection_handle]", form).val();
  const token = $("[name=token]", form).val();
  const path = $("[name=collection_url]", form).val();
  const hmac256 = HmacSHA256(handle + ID, hashPassword).toString();
  const newUrl = new URL(path, location.origin);

  // Compare hmac with token
  if (hmac256 === token) {
    showSuccess();
    setTimeout(() => {
      const hmac1 = HmacSHA1(handle + ID, hashPassword).toString();
      setSession(hmac1, hashPassword);
      newUrl.searchParams.append("q", hmac1);
      window.location.href = newUrl.toString();
    });
    return true;
  } else {
    showError();
    clearSession();
    return false;
  }
}

/**
 * Checks if there's an existing session and redirects accordingly
 */
function checkSessionAndRedirect() {
  const form = $("protected-form form");
  if (!form.length) return;

  const maintainSession = $("[name=maintain_session]", form).val().trim() === "true";
  if (!maintainSession) return;

  const hashPassword = sessionStorage.getItem("ss_p_sha256");
  const valid = validate(form, hashPassword);
  if (!valid) {
    clearSession();
  }
}

/**
 * Initializes the protected form submission handling
 */
function initProtectedForm() {
  $("protected-form form").on("submit.protected", function (e) {
    e.preventDefault();

    const self = $(this);
    const password = $("[name=password]", self).val();
    const hashPassword = SHA256(password).toString();

    validate(self, hashPassword);
  });
}

/**
 * Ensures that the token exists in the search parameters for facet filtering
 */
function ensureTokenExistOnSearchParams() {
  $("body").on("facets:extendSearchParams", function (e, memo) {
    if (!memo || !memo.searchParams) return;
    const params = getQueryStringParams(memo.searchParams);
    const hmac1 = Shopify.queryParams && Shopify.queryParams.q;
    if (hmac1) {
      params.q = hmac1;
      memo.searchParams = converToQueryString(params);
    }
  });
}

$(function () {
  checkSessionAndRedirect();
  initProtectedForm();
  ensureTokenExistOnSearchParams();
});
