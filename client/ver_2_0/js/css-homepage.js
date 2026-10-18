"use strict";

// CSS-only entry - the `css-` prefix keeps this one built in "es" format
// (so Vite extracts a linked .css file), while homepage.js builds as
// "iife" so a minified identifier can never leak onto `window`.
import "../scss/homepage/homepage.scss";
