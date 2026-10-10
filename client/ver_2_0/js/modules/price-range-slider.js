"use strict";

// Dual-handle price range slider for 5dla_filter-sort-drawer.liquid's
// "Slider" `price_range_mode`. Uses `nouislider` instead of two overlapping
// native <input type="range">s (no single-handle blocking) - its default
// skin is fully restyled in _filter-sort.scss (nouislider.css unused).
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

  // "update" fires continuously while dragging (live labels); the actual
  // filter request only needs the final value, on "change" (released).
  slider.on("update", values => {
    if (valueMin) valueMin.textContent = Math.round(values[0]);
    if (valueMax) valueMax.textContent = Math.round(values[1]);
  });

  slider.on("change", values => {
    // Shares the same hidden-input params as text-box mode, which expects
    // a money subunit (cents) - scale the slider's currency value up.
    if (inputMin) inputMin.value = Math.round(values[0] * 100);
    if (inputMax) inputMax.value = Math.round(values[1] * 100);

    // Setting `.value` in JS never fires "change" for filter-sort.js's
    // listener to catch, so submit directly instead.
    if (form) form.requestSubmit();
  });

  // filter-sort.js dispatches this after restoring `data-prev-value` on
  // drawer-close-without-submit - this slider's handles are independent
  // noUiSlider state, so they need an explicit re-sync too.
  if (form) {
    form.addEventListener("c5dla:filter-reset", () => {
      const resetMin = Number(inputMin?.value) / 100;
      const resetMax = Number(inputMax?.value) / 100;
      slider.set([resetMin || min, resetMax || max]);
    });
  }
};

export const initPriceRangeSlider = () => {
  document.querySelectorAll(SLIDER_SELECTOR).forEach(initSlider);
};
