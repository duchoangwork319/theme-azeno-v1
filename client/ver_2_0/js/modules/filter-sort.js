"use strict";

// Left-side offcanvas filter & sort drawer for
// snippets/5dla_filter-sort-drawer.liquid. Exported (not self-initializing)
// since there's only ever one drawer instance per page.
//
// Migrates assets/facets.js's `FacetFiltersForm` (Section Rendering API
// fetch + swap HTML, instead of a full reload) as plain functions, trimmed
// to this drawer's needs: every field applies on its own "change" (no
// Apply button, only Reset), via `?sections=<id>&<params>` (not the
// legacy's `?section_id=` endpoint). Dropped vs. the legacy: the debounce
// (a "change" event is already one-shot, unlike `input`), the `<price-range>`
// element (price-range-slider.js owns the slider and calls
// `form.requestSubmit()` directly), and the multi-section-cache
// optimization (this form only ever touches one section).
//
// Also owns `.c5dla-toolbar .genders` (snippets/5dla_filter-sort-genders.liquid) -
// see the `filter:filterByGender` listener at the bottom of `initFilterSort`.
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
 * Opens/closes the drawer + overlay, syncing `aria-expanded`/`aria-hidden`
 * and locking page scroll. The lock is an inline style, not a CSS class -
 * `body` is outside `.c5dla-scope` (that wrapper is on <main>), so a
 * `body.foo` rule in this scoped SCSS would get rewritten and never match.
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
 * Resets every field to the snapshot in its own `data-prev-value` (set
 * server-side) - called when the drawer closes WITHOUT submitting, so
 * unsaved edits don't appear selected next time it opens. Fires
 * `c5dla:filter-reset` afterward so price-range-slider.js can re-sync its
 * noUiSlider handles (independent of the hidden inputs' `value`).
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
 * Fetches `form`'s section (`data-section-id`) via the Section Rendering
 * API with `params` as the query string, then swaps the product grid/
 * pagination/drawer contents with the response - same idea as
 * collection.js's `loadNextPage`, applied to a filter/sort change.
 * @param {HTMLFormElement} form
 * @param {URLSearchParams} params
 * @param {() => void} [onGridUpdated] - re-runs collection.js's own re-inits
 *   against the swapped-in grid (not imported here, to avoid cross-imports).
 */
const applyFilters = async (form, params, onGridUpdated) => {
  if (filterRequestInFlight) return;

  const sectionId = form.dataset.sectionId;
  if (!sectionId) {
    // No section id to target - navigate rather than do nothing.
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

    // Swaps counts/active state/reset-link visibility - everything the
    // server recomputed - without touching the drawer's own open/closed state.
    const newBody = parsed.querySelector(DRAWER_BODY_SELECTOR);
    const currentBody = form.querySelector(DRAWER_BODY_SELECTOR);
    if (newBody && currentBody) currentBody.innerHTML = newBody.innerHTML;

    const newFoot = parsed.querySelector(DRAWER_FOOT_SELECTOR);
    const currentFoot = form.querySelector(DRAWER_FOOT_SELECTOR);
    if (newFoot && currentFoot) currentFoot.outerHTML = newFoot.outerHTML;

    // Genders toolbar lives outside this form - swapped too so its active
    // state stays correct even when changed from inside the drawer.
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

  // No Apply button - every field applies on change. Delegated on `form`
  // since fields get replaced wholesale each request (see `applyFilters`).
  form.addEventListener("change", event => {
    if (event.target.matches("input, select")) submitFilters();
  });

  // Kept for price-range-slider.js's `form.requestSubmit()` (setting a
  // hidden input's `.value` never fires "change") and as a no-JS fallback.
  form.addEventListener("submit", event => {
    event.preventDefault();
    submitFilters();
  });

  // Reset link is replaced each request too - delegate rather than bind
  // the (possibly stale) anchor directly.
  form.addEventListener("click", event => {
    const reset = event.target.closest(RESET_SELECTOR);
    if (!reset) return;
    event.preventDefault();
    applyFilters(form, new URLSearchParams(), onGridUpdated);
  });

  // Browser back/forward after a filter change - re-fetches for whatever's
  // now in the address bar (no cached-response lookup, unlike the legacy).
  window.addEventListener("popstate", () => {
    applyFilters(form, new URLSearchParams(window.location.search), onGridUpdated);
  });

  // Genders toolbar lives outside the form/drawer - delegate from `document`.
  document.addEventListener("click", event => {
    const button = event.target.closest(GENDER_BUTTON_SELECTOR);
    if (!button) return;
    document.dispatchEvent(new CustomEvent("filter:filterByGender", { detail: button.dataset.genderTitle }));
  });

  // Finds the clicked gender's checkbox (via `label[title]`, matching the
  // button's `detail`) and fires a real `change` on it, reusing the same
  // form "change" → AJAX path as every other field (not a separate path).
  // Enforces single-select: every OTHER gender input is unchecked first -
  // "" (All genders) skips the re-check, the only way to clear it since
  // these buttons don't toggle themselves off.
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
