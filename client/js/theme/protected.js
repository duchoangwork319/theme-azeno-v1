"use strict";

import {
  SHA256,
  HmacSHA256,
  HmacSHA1
} from "crypto-js";
import {
  converToQueryString,
  getQueryStringParams
} from "../components/helpers";
import {
  setProtectedSession,
  clearProtectedSession
} from "../services/session";
import {
  getRootUrl,
  getProtectedIdentity,
  getProtectedToken,
  getSessionDurationMs,
} from "../components/head-protected";

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

  const { handle, ID } = getProtectedIdentity();
  const token = getProtectedToken();
  const path = getRootUrl();
  const durationMs = getSessionDurationMs();
  const hmac256 = HmacSHA256(handle + ID, hashPassword).toString();

  // Compare hmac with token
  if (hmac256 === token) {
    showSuccess();
    setTimeout(() => {
      const hmac1 = HmacSHA1(handle + ID, hashPassword).toString();
      const newUrl = new URL(path, location.origin);
      setProtectedSession(hmac1, hashPassword, durationMs);
      newUrl.searchParams.append("q", hmac1);
      window.location.href = newUrl.toString();
    });
    return true;
  } else {
    showError();
    clearProtectedSession();
    return false;
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
  initProtectedForm();
  ensureTokenExistOnSearchParams();
});
