"use strict";

const KEY_SESSION = "ss_p";
const DEFAULT_TTL_MS = 30 * 60 * 1000;

/**
 * Clears the protected session data from localStorage
 */
function clearProtectedSession() {
  localStorage.removeItem(KEY_SESSION);
}

/**
 * Reads the protected session data from localStorage and checks for expiration
 * @returns {Object} An object containing hmac1, sha256, and expired status
 */
function readSession() {
  const raw = localStorage.getItem(KEY_SESSION);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (error) {
    clearProtectedSession();
    return null;
  }
}

/**
 * Retrieves the protected session data, checks for expiration, and returns the relevant information
 * @returns {Object} An object containing hmac1, sha256, and expired status
 */
function getProtectedSession() {
  const data = readSession();
  if (!data) return { hmac1: null, sha256: null, expired: true };

  const expiresAt = Number(data.expiresAt);
  if (!expiresAt || Number.isNaN(expiresAt) || Date.now() > expiresAt) {
    clearProtectedSession();
    return { hmac1: null, sha256: null, expired: true };
  }

  const hmac1 = data.hmac1 || null;
  const sha256 = data.sha256 || null;
  if (!hmac1 || !sha256) {
    clearProtectedSession();
    return { hmac1: null, sha256: null, expired: false };
  }

  return { hmac1, sha256, expired: false, ttlMs: Number(data.ttlMs) || DEFAULT_TTL_MS };
}

/**
 * Sets the protected session data in localStorage
 * @param {string} hmac1 - The HMAC-SHA1 hash to store in the session
 * @param {string} sha256 - The SHA256 hash to store in the session
 * @param {number} ttlMs - Time to live in milliseconds for the session (optional, defaults to 30 minutes)
 * @returns {void}
 */
function setProtectedSession(hmac1, sha256, ttlMs = DEFAULT_TTL_MS) {
  if (!hmac1 || !sha256) {
    clearProtectedSession();
    return;
  }

  const ttl = Number.isFinite(ttlMs) ? ttlMs : DEFAULT_TTL_MS;
  const expiresAt = Date.now() + ttl;

  const payload = { hmac1, sha256, ttlMs: ttl, expiresAt };
  localStorage.setItem(KEY_SESSION, JSON.stringify(payload));
}

export { setProtectedSession, getProtectedSession, clearProtectedSession };
