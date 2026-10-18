"use strict";

// CSS-only entry - the `css-` prefix keeps this one built in "es" format
// (so Vite extracts a linked .css file). No matching behavior entry (no
// `global.js`) - this bundle is CSS/fonts only, loaded alongside
// collection.js/homepage.js (see snippets/footer-javascript-optimized.liquid).
import "../scss/global/global.scss";
