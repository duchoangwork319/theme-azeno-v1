"use strict";

// CSS-only entry - the `css-` prefix keeps this one built in "es" format
// (so Vite extracts a linked .css file). No matching behavior entry (no
// `global.js`) - this bundle is CSS/fonts only, loaded alongside
// collection.js/homepage.js (see snippets/footer-javascript-optimized.liquid).
import "../scss/global/global.scss";

// Swiper's own CSS, used by modules/quick-view.js's product gallery and
// modules/product-carousel.js's carousel. A plain SCSS `@import` can't
// inline this (Sass only emits a literal, non-functional pass-through
// `@import url(...)` for any `.css`-extension target - it never reads the
// file), so it has to come in as a JS import instead, in an "es"-format
// entry like this one so Vite actually extracts it into this bundle's
// linked stylesheet. Doing it here (rather than inside those "iife"
// modules, which have no linked stylesheet to extract into and would only
// reach the page via a runtime `<style>` tag) means it's present from the
// very first paint - product-carousel.js relies on that to avoid a layout
// shift (unstyled `.swiper-slide`s stacking full-width until that JS ran).
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
