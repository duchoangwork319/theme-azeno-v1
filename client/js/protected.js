"use strict";

import { SHA256, HmacSHA256, HmacSHA1 } from "crypto-js";
import { converToQueryString, getQueryStringParams } from "./components/helpers";

/**
 * Initializes the protected form submission handling
 */
function initProtectedForm() {
  $("protected-form form").on("submit.protected", function (e) {
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
    const newUrl = new URL(path, location.origin);

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
