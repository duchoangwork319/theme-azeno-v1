"use strict";

import {
  HmacSHA1,
  HmacSHA256
} from "crypto-js";
import {
  setProtectedSession,
  getProtectedSession,
  clearProtectedSession,
  refreshSession
} from "./services/session";
import {
  getMetaContent,
  getRootUrl,
  redirectToRoot,
  getProtectedIdentity,
  getProtectedToken,
  getMaintainSession,
  getSessionDurationMs,
} from "./components/head-protected";

(function () {
  const state = getMetaContent("protected-state");

  // Access direct link but not have session, redirect to root
  if (state === "authorized") {
    const { sha256: hashPassword, expired } = getProtectedSession();
    if (!hashPassword || expired) {
      clearProtectedSession();
      redirectToRoot();
      return;
    } else if (hashPassword && !expired) {
      refreshSession();
    }
  }

  // Access form, if session is valid, redirect to collection with session, otherwise stay on form page
  if (state === "protected") {
    const { sha256: hashPassword } = getProtectedSession();
    const { handle, ID } = getProtectedIdentity();
    const token = getProtectedToken();
    const path = getRootUrl();
    const maintainSession = getMaintainSession();
    const durationMs = getSessionDurationMs();

    // No session
    if (!hashPassword) {
      clearProtectedSession();
      return;
    }

    // Not enable maintain session
    if (!maintainSession) return;

    const message = handle + ID;
    const hmac256 = HmacSHA256(message, hashPassword).toString().trim();
    if (hmac256 === token) {
      const hmac1 = HmacSHA1(message, hashPassword).toString();
      const newUrl = new URL(path, location.origin);
      setProtectedSession(hmac1, hashPassword, durationMs);
      newUrl.searchParams.append("q", hmac1);
      window.location.href = newUrl.toString();
    } else {
      clearProtectedSession();
    }
  }
})();
