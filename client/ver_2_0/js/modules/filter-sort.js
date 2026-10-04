"use strict";

// Left-side offcanvas filter & sort drawer for
// snippets/5dla_filter-sort-drawer.liquid. Exported (not self-initializing)
// so client/ver_2_0/js/collection.js can init it once on first load -
// there's only ever one drawer instance per page, unlike variant.js/
// initVariantPickers (which re-binds per paginated card).
//
// The actual filter/sort REQUEST migrates assets/facets.js's `FacetFiltersForm`
// logic (Section Rendering API fetch + swap the rendered HTML in, instead of
// a full page reload) - rewritten as plain functions (no `class`) and
// trimmed to what this new drawer actually needs:
//   - kept: fetch `?sections=<id>&<form params>` (same convention already
//     used for pagination in collection.js's `loadNextPage`, not the
//     legacy's own `?section_id=<id>` raw-HTML endpoint), swap in the
//     refreshed `.products`/pagination/drawer-body/drawer-foot markup,
//     `history.pushState` the new URL, a `popstate` listener to restore it,
//     and (closer to the legacy's own debounced auto-submit-on-`input` than
//     the previous pass here) every field applies on its own "change" -
//     there's no separate Apply button, only Reset.
//   - dropped: the legacy's debounce itself (a "change" event is already
//     one-shot per edit, unlike the `input` event it debounced), the legacy
//     `<price-range>` element (client/ver_2_0/js/modules/price-range-slider.js
//     already owns the slider - it calls `form.requestSubmit()` from its own
//     "change" instead of this form listening for a DOM event that setting
//     `.value` in JS never fires), and the multi-section-cache/"render just
//     the facet that changed" optimization (`FacetFiltersForm.filterData`/
//     `renderFilters`'s index-matching) - this form only ever touches ONE
//     section, so that bookkeeping has nothing to buy here.
//
// Also owns `.c5dla-toolbar .genders`'s quick-filter buttons
// (snippets/5dla_filter-sort-genders.liquid) - see the `filter:filterByGender`
// listener at the bottom of `initFilterSort` for how a button click reaches
// this same form's gender checkbox.
import { startSpinner, stopSpinner } from "../utils/spinner.js";

const TOGGLE_SELECTOR = "[data-c5dla-filter-toggle]";
const DRAWER_SELECTOR = "[data-c5dla-filter-drawer]";
const OVERLAY_SELECTOR = "[data-c5dla-filter-overlay]";
const CLOSE_SELECTOR = "[data-c5dla-filter-close]";
const RESET_SELECTOR = "[data-c5dla-filter-reset]";
const PRODUCTS_SELECTOR = ".products";
const PAGINATION_SELECTOR = "[data-c5dla-pagination]";
const DRAWER_BODY_SELECTOR = ".c5dla-filter-drawer__body";
const DRAWER_FOOT_SELECTOR = ".c5dla-filter-drawer__foot";
const GENDERS_SELECTOR = ".c5dla-toolbar .genders";
const GENDER_BUTTON_SELECTOR = "[data-c5dla-gender-button]";
const GENDER_INPUT_SELECTOR = "input[name=\"filter.v.t.shopify.target-gender\"]";

let filterRequestInFlight = false;

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

/**
 * Ports assets/wpbingo.js/assets/facets.js's fetch-and-swap approach for
 * this form: fetches `form`'s own section (`data-section-id`, set from
 * `section.id` in snippets/5dla_filter-sort-drawer.liquid) via the Section
 * Rendering API with `params` as the query string, then replaces the
 * product grid/pagination/drawer contents with the freshly rendered
 * markup - same idea as collection.js's `loadNextPage`, applied to a
 * filter/sort change instead of a "load more" click.
 * @param {HTMLFormElement} form
 * @param {URLSearchParams} params
 * @param {() => void} [onGridUpdated] - re-runs whatever collection.js needs
 *   re-run against the freshly swapped-in grid (card height equalizing,
 *   variant pickers, infinite scroll, the price slider) - filter-sort.js
 *   doesn't import those modules itself to avoid a tangle of cross-imports.
 */
const applyFilters = async (form, params, onGridUpdated) => {
  if (filterRequestInFlight) return;

  const sectionId = form.dataset.sectionId;
  if (!sectionId) {
    // No section id to target - fall back to a real navigation rather than
    // silently doing nothing.
    window.location.assign(`${form.action}?${params.toString()}`);
    return;
  }

  filterRequestInFlight = true;
  startSpinner();

  try {
    const requestUrl = new URL(form.action, window.location.origin);
    requestUrl.search = params.toString();
    requestUrl.searchParams.set("sections", sectionId);

    const response = await fetch(requestUrl.toString(), {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });
    if (!response.ok) throw new Error(`Filter request failed: ${response.status}`);

    const data = await response.json();
    const html = data[sectionId];
    if (!html) throw new Error("Filter response missing section HTML");

    const parsed = new DOMParser().parseFromString(html, "text/html");

    const newProducts = parsed.querySelector(PRODUCTS_SELECTOR);
    const currentProducts = document.querySelector(PRODUCTS_SELECTOR);
    if (newProducts && currentProducts) currentProducts.replaceWith(newProducts);

    const newPagination = parsed.querySelector(PAGINATION_SELECTOR);
    const currentPagination = document.querySelector(PAGINATION_SELECTOR);
    if (currentPagination) {
      if (newPagination) currentPagination.replaceWith(newPagination);
      else currentPagination.remove();
    } else if (newPagination && newProducts) {
      newProducts.insertAdjacentElement("afterend", newPagination);
    }

    // Swaps counts/active state/`data-prev-value` for every facet value and
    // the sort <select>, plus the reset link's visibility - everything the
    // server recomputed from this request's filters, without touching the
    // drawer's own open/closed state (`<aside data-c5dla-filter-drawer>`
    // itself is never replaced).
    const newBody = parsed.querySelector(DRAWER_BODY_SELECTOR);
    const currentBody = form.querySelector(DRAWER_BODY_SELECTOR);
    if (newBody && currentBody) currentBody.innerHTML = newBody.innerHTML;

    const newFoot = parsed.querySelector(DRAWER_FOOT_SELECTOR);
    const currentFoot = form.querySelector(DRAWER_FOOT_SELECTOR);
    if (newFoot && currentFoot) currentFoot.outerHTML = newFoot.outerHTML;

    // `.c5dla-toolbar .genders` (snippets/5dla_filter-sort-genders.liquid)
    // lives OUTSIDE this form, in the toolbar - swapped in too so its
    // buttons' own `active` class stays correct even when the gender
    // filter was changed from inside the drawer itself, not from a
    // toolbar button.
    const newGenders = parsed.querySelector(GENDERS_SELECTOR);
    const currentGenders = document.querySelector(GENDERS_SELECTOR);
    if (newGenders && currentGenders) currentGenders.outerHTML = newGenders.outerHTML;

    const search = params.toString();
    history.pushState({ c5dlaFilterParams: search }, "", `${requestUrl.pathname}${search ? `?${search}` : ""}`);

    onGridUpdated?.();
  } catch (error) {
    // Fall back to a real navigation so filtering still works.
    window.location.assign(`${form.action}?${params.toString()}`);
  } finally {
    filterRequestInFlight = false;
    stopSpinner();
  }
};

/**
 * @param {{ onGridUpdated?: () => void }} [options]
 */
export const initFilterSort = ({ onGridUpdated } = {}) => {
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

  const submitFilters = () => applyFilters(form, new URLSearchParams(new FormData(form)), onGridUpdated);

  // No Apply button - every checkbox/select/number field applies the
  // moment it changes. Delegated on `form` (not bound per-field) since
  // every field inside `DRAWER_BODY_SELECTOR` gets replaced wholesale on
  // each request (see `applyFilters` above) - a direct per-element listener
  // would be lost the first time its own field got swapped out.
  form.addEventListener("change", event => {
    if (event.target.matches("input, select")) submitFilters();
  });

  // Kept for the price slider (client/ver_2_0/js/modules/price-range-slider.js
  // calls `form.requestSubmit()` from its own "change", since writing a
  // hidden input's `.value` in JS never fires a DOM "change" the listener
  // above would catch) and as a no-JS-disabled-safe fallback (this form's
  // `action`/`method="get"`/field `name`s are all real).
  form.addEventListener("submit", event => {
    event.preventDefault();
    submitFilters();
  });

  // The reset link is inside `DRAWER_FOOT_SELECTOR` too, so it's replaced
  // along with everything else on every request - delegate from `form`
  // instead of binding the (possibly stale) anchor element directly.
  form.addEventListener("click", event => {
    const reset = event.target.closest(RESET_SELECTOR);
    if (!reset) return;
    event.preventDefault();
    applyFilters(form, new URLSearchParams(), onGridUpdated);
  });

  // Ports `FacetFiltersForm.setListeners`'s `popstate` handling (browser
  // back/forward after a filter change) - re-fetches for whatever's now in
  // the address bar instead of the legacy's own cached-response lookup,
  // since this form only ever has one URL in flight at a time.
  window.addEventListener("popstate", () => {
    applyFilters(form, new URLSearchParams(window.location.search), onGridUpdated);
  });

  // `.c5dla-toolbar .genders` (snippets/5dla_filter-sort-genders.liquid)
  // lives OUTSIDE this form/the drawer entirely - delegate from `document`
  // (not `form`) since these buttons aren't a descendant of it, and get
  // replaced wholesale on every request same as everything else here (see
  // `applyFilters`'s `GENDERS_SELECTOR` swap above).
  document.addEventListener("click", event => {
    const button = event.target.closest(GENDER_BUTTON_SELECTOR);
    if (!button) return;
    document.dispatchEvent(new CustomEvent("filter:filterByGender", { detail: button.dataset.genderTitle }));
  });

  // `filter:filterByGender` (dispatched above, with the clicked button's
  // gender title as `detail` - "" for "All genders"): finds that gender
  // value's checkbox via `label[title="..."] input[name="filter.v.t.shopify.
  // target-gender"]` (see snippets/5dla_filter-sort-drawer.liquid's own top
  // comment for why every value's `<label>` carries that `title`) and fires
  // a real `change` on it, reusing the exact same form "change" → AJAX path
  // every other field already goes through - NOT a second, separate
  // filtering mechanism.
  //
  // Unlike a plain checkbox toggle, this enforces single-select: every
  // OTHER gender input is unchecked first, so clicking "Men" while "Women"
  // is active switches straight to Men instead of selecting both. "All
  // genders" (`detail` is "") skips the re-check step entirely, which is
  // the only way to clear gender filtering back out - these buttons can't
  // un-select themselves by clicking the same one twice.
  document.addEventListener("filter:filterByGender", event => {
    const title = event.detail;
    const genderInputs = document.querySelectorAll(GENDER_INPUT_SELECTOR);
    if (!genderInputs.length) return;

    genderInputs.forEach(input => {
      input.checked = false;
    });

    if (title) {
      const target = document.querySelector(`label[title="${CSS.escape(title)}"] ${GENDER_INPUT_SELECTOR}`);
      if (target) target.checked = true;
    }

    genderInputs[0].dispatchEvent(new Event("change", { bubbles: true }));
  });
};
