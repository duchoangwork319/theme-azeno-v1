"use strict";

import { HmacSHA1 } from "crypto-js";

(function () {
  const getMetaContent = (tagName) => {
    const meta = document.querySelector(`meta[name=\"${tagName}\"]`);
    return meta ? meta.getAttribute("content") : null;
  };
  const clearSession = () => {
    sessionStorage.removeItem("ss_p_hmac1");
    sessionStorage.removeItem("ss_p_sha256");
  };
  const redirectToRoot = () => {
    const rootUrl = getMetaContent("root-url");
    window.location.href = rootUrl || "/";
  };

  const ssHmac1 = sessionStorage.getItem("ss_p_hmac1");
  const hashPassword = sessionStorage.getItem("ss_p_sha256");

  if (!ssHmac1 || !hashPassword) {
    clearSession();
    redirectToRoot();
    return;
  }

  const handle = getMetaContent("protected-handle");
  const ID = getMetaContent("protected-id");
  const protectedHash = HmacSHA1(handle + ID, hashPassword).toString().trim();

  // Compare hashes
  if (protectedHash && ssHmac1 !== protectedHash) {
    clearSession();
    redirectToRoot();
    return;
  }
})();
