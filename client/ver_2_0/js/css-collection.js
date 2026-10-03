"use strict";

// CSS-only entry (see scripts/vite-build.mjs's buildVer2Entry) - the
// `css-` name prefix keeps this one entry built in "es" format so Vite
// still extracts its CSS into its own bundled.css-collection.2.0.css file,
// while every OTHER client/ver_2_0/js/*.js entry (collection.js) switches
// to "iife" so a minified top-level identifier can never leak onto
// `window` (see client/ver_2_0/js/collection.js's own history: esbuild
// once mangled a local const down to `$`, clobbering jQuery's global).
import "../scss/collection/collection.scss";
