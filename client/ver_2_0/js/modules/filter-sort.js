"use strict";

// Left-side offcanvas filter & sort drawer for
// snippets/5dla_filter-sort-drawer.liquid. Exported (not self-initializing)
// so client/ver_2_0/js/collection.js can init it once on first load -
// there's only ever one drawer instance per page, unlike variant.js/
// initVariantPickers (which re-binds per paginated card).
//
// Filtering/sorting themselves are plain HTML form submissions (the
// `<form data-c5dla-filter-form>` has real `name`s/`action`, so it works
// with JS disabled) - this module only owns the drawer's open/closed UI
// state, not the actual filter results.

const TOGGLE_SELECTOR = "[data-c5dla-filter-toggle]";
const DRAWER_SELECTOR = "[data-c5dla-filter-drawer]";
const OVERLAY_SELECTOR = "[data-c5dla-filter-overlay]";
const CLOSE_SELECTOR = "[data-c5dla-filter-close]";
const SORT_SELECTOR = "[data-c5dla-filter-sort]";

/**
 * Opens/closes the drawer + its overlay together, keeping the trigger
 * button's `aria-expanded` and the drawer's `aria-hidden`/`hidden` in sync,
 * and locking page scroll while open (the drawer is `position: fixed` and
 * can itself scroll internally - see client/ver_2_0/scss/collection/
 * _filter-sort.scss). The lock is a direct inline style, not a CSS class -
 * `body` sits outside `.c5dla-scope` (that wrapper is on <main>), so a
 * `body.foo` rule in this stack's own scoped SCSS would get rewritten to
 * `.c5dla-scope.foo` by scripts/vite-build.mjs's prefixer and never match
 * the real <body>.
 * @param {Element} toggle
 * @param {Element} drawer
 * @param {Element} overlay
 * @param {boolean} open
 */
const setDrawerOpen = (toggle, drawer, overlay, open) => {
  drawer.hidden = !open;
  overlay.hidden = !open;
  drawer.setAttribute("aria-hidden", String(!open));
  toggle.setAttribute("aria-expanded", String(open));
  document.body.style.overflow = open ? "hidden" : "";

  if (open) {
    const firstField = drawer.querySelector("input, select, button, a[href]");
    if (firstField) firstField.focus();
  } else {
    toggle.focus();
  }
};

export const initFilterSort = () => {
  const toggle = document.querySelector(TOGGLE_SELECTOR);
  const drawer = document.querySelector(DRAWER_SELECTOR);
  const overlay = document.querySelector(OVERLAY_SELECTOR);
  if (!toggle || !drawer || !overlay) return;

  const close = document.querySelector(CLOSE_SELECTOR);
  const sortSelect = drawer.querySelector(SORT_SELECTOR);
  const form = drawer.querySelector("[data-c5dla-filter-form]");

  toggle.addEventListener("click", () => setDrawerOpen(toggle, drawer, overlay, true));
  overlay.addEventListener("click", () => setDrawerOpen(toggle, drawer, overlay, false));
  if (close) close.addEventListener("click", () => setDrawerOpen(toggle, drawer, overlay, false));

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !drawer.hidden) setDrawerOpen(toggle, drawer, overlay, false);
  });

  // Checkbox filters submit immediately (no separate "apply" step needed
  // for them) - the sort <select> and price number inputs still rely on
  // the drawer's own submit button, since those are mid-typing/mid-choice
  // until the shopper is done with them.
  form.addEventListener("change", event => {
    if (event.target.matches("input[type='checkbox']")) form.requestSubmit();
  });

  if (sortSelect) {
    sortSelect.addEventListener("change", () => form.requestSubmit());
  }
};
