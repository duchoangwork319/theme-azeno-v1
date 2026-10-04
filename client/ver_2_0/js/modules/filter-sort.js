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
  document.body.classList.toggle("c5dla-filter-drawer-open", open);

  if (open) {
    const firstField = drawer.querySelector("input, select, button, a[href]");
    if (firstField) firstField.focus();
  } else {
    toggle.focus();
  }
};

/**
 * Resets every field in the form back to the snapshot it carries in its own
 * `data-prev-value` (set server-side in snippets/5dla_filter-sort-drawer.liquid
 * - a checkbox's "true"/"false", everything else its literal value) - called
 * when the drawer is closed WITHOUT submitting, so a shopper who ticks a few
 * boxes/drags the price slider and then closes instead of hitting Apply
 * doesn't reopen the drawer to find those still showing as selected.
 *
 * Fires a `c5dla:filter-reset` event on the form afterward so
 * price-range-slider.js can re-sync its own noUiSlider position/labels from
 * the now-restored hidden inputs - a slider instance's visual handles are
 * independent state, not driven by the hidden inputs' `value` attribute.
 * @param {HTMLFormElement} form
 */
const restoreFormState = form => {
  form.querySelectorAll("[data-prev-value]").forEach(field => {
    if (field.type === "checkbox") {
      field.checked = field.dataset.prevValue === "true";
    } else {
      field.value = field.dataset.prevValue;
    }
  });

  form.dispatchEvent(new CustomEvent("c5dla:filter-reset"));
};

export const initFilterSort = () => {
  const toggle = document.querySelector(TOGGLE_SELECTOR);
  const drawer = document.querySelector(DRAWER_SELECTOR);
  const overlay = document.querySelector(OVERLAY_SELECTOR);
  if (!toggle || !drawer || !overlay) return;

  const close = document.querySelector(CLOSE_SELECTOR);
  const form = drawer.querySelector("[data-c5dla-filter-form]");

  const cancelClose = () => {
    restoreFormState(form);
    setDrawerOpen(toggle, drawer, overlay, false);
  };

  toggle.addEventListener("click", () => setDrawerOpen(toggle, drawer, overlay, true));
  overlay.addEventListener("click", cancelClose);
  if (close) close.addEventListener("click", cancelClose);

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !drawer.hidden) cancelClose();
  });

  // Every field (checkboxes, sort <select>, price inputs/slider) only ever
  // stages a choice - nothing here auto-submits on "change". The form's
  // `.c5dla-filter-drawer__apply` button is a plain `type="submit"`, so the
  // browser's own native click-to-submit is already "submit only on Apply" -
  // no JS needed for it (and still works with JS disabled).
  // price-range-slider.js's own "change" handler just writes into its
  // hidden inputs, it no longer calls `form.requestSubmit()` either.
};
