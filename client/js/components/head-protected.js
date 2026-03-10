"use strict";

function getMetaContent(tagName) {
  const meta = document.querySelector(`meta[name="${tagName}"]`);
  return meta ? meta.getAttribute("content") : null;
}

function getRootUrl() {
  return getMetaContent("root-url") || "/";
}

function redirectToRoot() {
  const path = getRootUrl();
  const url = new URL(path, location.origin);
  window.location.href = url.toString();
}

function getProtectedIdentity() {
  return {
    handle: getMetaContent("protected-handle"),
    ID: getMetaContent("protected-id"),
  };
}

function getProtectedToken() {
  return getMetaContent("protected-token");
}

function getMaintainSession() {
  return getMetaContent("protected-session-maintain") === "true";
}

function getSessionDurationMs() {
  const duration = Number(getMetaContent("protected-session-duration"));
  return Number.isFinite(duration) && duration > 0
    ? duration * 60 * 1000
    : undefined;
}

export {
  getMetaContent,
  getRootUrl,
  redirectToRoot,
  getProtectedIdentity,
  getProtectedToken,
  getMaintainSession,
  getSessionDurationMs,
};
