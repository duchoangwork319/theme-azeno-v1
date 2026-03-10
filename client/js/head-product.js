"use strict";

import { HmacSHA1 } from "crypto-js";
import {
  getProtectedSession,
  clearProtectedSession,
  refreshSession
} from "./services/session";
import {
  redirectToRoot,
  getProtectedIdentity,
} from "./components/head-protected";

(function () {
  const { hmac1: ssHmac1, sha256: hashPassword } = getProtectedSession();

  if (!ssHmac1 || !hashPassword) {
    clearProtectedSession();
    redirectToRoot();
    return;
  }

  const { handle, ID } = getProtectedIdentity();
  const hmac1 = HmacSHA1(handle + ID, hashPassword).toString().trim();

  // Compare hashes
  if (ssHmac1 === hmac1) {
    // Refresh session
    refreshSession();
  } else {
    // Invalid session, clear and redirect
    clearProtectedSession();
    redirectToRoot();
  }
  return;
})();
