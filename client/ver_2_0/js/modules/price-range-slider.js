"use strict";

// Dual-handle price range slider for
// snippets/5dla_filter-sort-drawer.liquid's "Slider" `price_range_mode`
// (section.settings.price_range_mode on 5dla_collection-product-grid.liquid).
// Uses the `nouislider` package (node_modules/nouislider) instead of two
// overlapping native <input type="range">s (what snippets/filter-sidebar.liquid
// did) - noUiSlider supports true two-handle drag without one handle
// blocking the other. Its own default skin is restyled from scratch in
// client/ver_2_0/scss/collection/_filter-sort.scss (its shipped
// nouislider.css is never imported) to match this theme.
import noUiSlider from "nouislider";

const SLIDER_SELECTOR = "[data-c5dla-price-slider]";

/**
 * @param {Element} container
 */
const initSlider = container => {
  const min = Number(container.dataset.min);
  const max = Number(container.dataset.max);
  const startMin = Number(container.dataset.startMin);
  const startMax = Number(container.dataset.startMax);
  if (!Number.isFinite(min) || !Number.isFinite(max) || max <= min) return;

  const section = container.closest(".c5dla-filter-drawer__section");
  const valueMin = section?.querySelector("[data-c5dla-price-value-min]");
  const valueMax = section?.querySelector("[data-c5dla-price-value-max]");
  const inputMin = section?.querySelector("[data-c5dla-price-input-min]");
  const inputMax = section?.querySelector("[data-c5dla-price-input-max]");
  const form = container.closest("[data-c5dla-filter-form]");

  const slider = noUiSlider.create(container, {
    start: [startMin || min, startMax || max],
    connect: true,
    step: 1,
    range: { min, max },
  });

  // "update" fires continuously while dragging (live label text); the
  // hidden inputs - and the actual filter request - only need the final
  // value, applied on "change" (handle released).
  slider.on("update", values => {
    if (valueMin) valueMin.textContent = Math.round(values[0]);
    if (valueMax) valueMax.textContent = Math.round(values[1]);
  });

  slider.on("change", values => {
    // Hidden inputs share `filter.min_value.param_name`/`max_value.param_name`
    // with the text-box mode (snippets/5dla_filter-sort-drawer.liquid) -
    // that param's unit matches `filter.min_value.value` directly (cents-like
    // "money" subunit, see money_without_currency usage in that snippet),
    // so scale the slider's own human-currency value back up before writing.
    if (inputMin) inputMin.value = Math.round(values[0] * 100);
    if (inputMax) inputMax.value = Math.round(values[1] * 100);
    if (form) form.requestSubmit();
  });
};

export const initPriceRangeSlider = () => {
  document.querySelectorAll(SLIDER_SELECTOR).forEach(initSlider);
};
