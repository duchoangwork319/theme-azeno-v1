"use strict";

// CSS-only entry - the `css-` prefix keeps this one built in "es" format
// (so Vite extracts a linked .css file), while every other entry builds
// as "iife" so a minified identifier can never leak onto `window` (this
// once mangled a const down to `$`, clobbering jQuery's global).
import "../scss/collection/collection.scss";
