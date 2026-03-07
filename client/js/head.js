"use strict";

(function () {
  // Get hash param from URL
  const urlParams = new URLSearchParams(window.location.search);
  const hashParam = urlParams.get("hash");

  const getMetaContent = (tagName) => {
    const meta = document.querySelector(`meta[name=\"${tagName}\"]`);
    return meta ? meta.getAttribute("content") : null;
  };

  // Get protected-hash from meta tag
  const protectedHash = getMetaContent("protected-hash");
  const rootUrl = getMetaContent("root-url");

  // Compare hashes
  if (protectedHash && protectedHash.trim() !== "" && hashParam !== protectedHash) {
    window.location.href = rootUrl || "/";
  }
})();
