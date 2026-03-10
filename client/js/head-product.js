"use strict";

import { HmacSHA1 } from "crypto-js";
import {
  setProtectedSession,
  getProtectedSession,
  clearProtectedSession
} from "./services/session";

(function () {
  const getMetaContent = (tagName) => {
    const meta = document.querySelector(`meta[name="${tagName}"]`);
    return meta ? meta.getAttribute("content") : null;
  };
  const redirectToRoot = () => {
    const rootUrl = getMetaContent("root-url");
    window.location.href = rootUrl || "/";
  };

  const { hmac1: ssHmac1, sha256: hashPassword, ttlMs } = getProtectedSession();

  if (!ssHmac1 || !hashPassword) {
    clearProtectedSession();
    redirectToRoot();
    return;
  }

  const handle = getMetaContent("protected-handle");
  const ID = getMetaContent("protected-id");
  const protectedHash = HmacSHA1(handle + ID, hashPassword).toString().trim();

  // Compare hashes
  if (ssHmac1 === protectedHash) {
    // Refresh session
    setProtectedSession(ssHmac1, hashPassword, ttlMs);
  } else {
    // Invalid session, clear and redirect
    clearProtectedSession();
    redirectToRoot();
  }
  return;
})();
