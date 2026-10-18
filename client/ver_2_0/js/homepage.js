"use strict";

// This entry's SCSS lives in the sibling css-homepage.js entry (see
// client/ver_2_0/js/css-collection.js's comment for why the split exists:
// keeps this entry's "iife" output window-safe when minified).
import { initCarousel } from "./modules/carousel.js";

document.addEventListener("DOMContentLoaded", () => {
  initCarousel();
});
