"use strict";

// Shared Quick View modal (snippets/5dla_quick-view-modal.liquid, rendered
// once per page from layout/theme.liquid; ports the legacy `wpbingo.
// QuickView`/`#quickiew-tempvlate`). Any 5dla_product-card-*.liquid just
// needs a `[data-quick-view-trigger]` button - one delegated click
// listener on `document` (not per-card like variant.js), so new/appended
// cards work with no re-init call needed.
//
// Variant resolution reuses ./variant-resolve.js and ./variant-state.js's
// `variantOptionValue`/`formatMoney`.
//
// The modal is Bootstrap 5's own `Modal` component - show/hide, backdrop,
// Escape-to-close, scroll lock, and focus trap/return all come from it;
// this file only populates content and reacts to `shown.bs.modal`/
// `hidden.bs.modal`.
//
// Image carousel is Swiper (legacy used Slick) - `swiper/css*` imported
// here since this entry has no linked stylesheet (Vite injects via
// runtime `<style>`). Swiper is only instantiated AFTER `shown.bs.modal`
// fires (`applyCarousel`/`flushPendingCarousel`) - building it while
// `.modal` is still `display: none` made Swiper measure a zero-width
// container and produce a ~33,554,400px-wide layout.

import Swiper from "swiper";
import { Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import Modal from "bootstrap/js/dist/modal";

import { variantOptionValue, formatMoney } from "./variant-state.js";
import { findExactVariant, findAnchorVariant, isValueAvailable } from "./variant-resolve.js";

const TRIGGER_SELECTOR = "[data-quick-view-trigger]";
const CARD_JSON_SELECTOR = "[data-product-json]";

let bound = false;

const els = {};
let swiper = null;
let bsModal = null;
let modalShown = false;
let pendingSlides = null;

/**
 * Caches every `[data-c5dla-quick-view-*]` element once, on first use -
 * only one modal instance per page, so no scoping/root param needed here.
 * @returns {boolean} false if the modal isn't on this page at all.
 */
const resolveEls = () => {
  if (els.root) return true;

  const root = document.querySelector("[data-c5dla-quick-view]");
  if (!root) return false;

  els.root = root;
  els.dialog = root.querySelector("[data-c5dla-quick-view-dialog]");
  els.loading = root.querySelector("[data-c5dla-quick-view-loading]");
  els.content = root.querySelector("[data-c5dla-quick-view-content]");
  els.carousel = root.querySelector("[data-c5dla-quick-view-carousel]");
  els.carouselWrapper = root.querySelector("[data-c5dla-quick-view-carousel-wrapper]");
  els.carouselPrev = root.querySelector("[data-c5dla-quick-view-carousel-prev]");
  els.carouselNext = root.querySelector("[data-c5dla-quick-view-carousel-next]");
  els.title = root.querySelector("[data-c5dla-quick-view-title]");
  els.vendor = root.querySelector("[data-c5dla-quick-view-vendor]");
  els.price = root.querySelector("[data-c5dla-quick-view-price]");
  els.options = root.querySelector("[data-c5dla-quick-view-options]");
  els.available = root.querySelector("[data-c5dla-quick-view-available]");
  els.availableText = root.querySelector("[data-c5dla-quick-view-available-text]");
  els.form = root.querySelector("[data-c5dla-quick-view-form]");
  els.variantInput = root.querySelector("[data-c5dla-quick-view-variant-input]");
  els.qtyInput = root.querySelector("[data-c5dla-quick-view-qty-input]");
  els.qtyMinus = root.querySelector("[data-c5dla-quick-view-qty-minus]");
  els.qtyPlus = root.querySelector("[data-c5dla-quick-view-qty-plus]");
  els.submit = root.querySelector("[data-c5dla-quick-view-submit]");
  els.submitLabel = root.querySelector("[data-c5dla-quick-view-submit-label]");
  els.fullLink = root.querySelector("[data-c5dla-quick-view-full-link]");

  els.qtyMinus.addEventListener("click", () => {
    els.qtyInput.value = Math.max(1, (parseInt(els.qtyInput.value, 10) || 1) - 1);
  });
  els.qtyPlus.addEventListener("click", () => {
    els.qtyInput.value = (parseInt(els.qtyInput.value, 10) || 1) + 1;
  });

  bsModal = Modal.getOrCreateInstance(root);

  // Swiper can only be safely initialized once the modal is visible at
  // its real size (see top comment).
  root.addEventListener("shown.bs.modal", () => {
    modalShown = true;
    flushPendingCarousel();
  });

  root.addEventListener("hidden.bs.modal", () => {
    modalShown = false;
    if (swiper) {
      swiper.destroy(true, true);
      swiper = null;
    }
    els.activeTrigger?.focus?.();
    els.activeTrigger = null;
  });

  return true;
};

/**
 * Resizes a Shopify CDN image URL via its `width` query param - same as
 * ./variant-state.js's own (unexported) `resizeImage`.
 * @param {string} src
 * @param {number} width
 */
const resizeImage = (src, width) => {
  if (!src) return src;
  const url = new URL(src, window.location.origin);
  url.searchParams.set("width", String(width));
  return url.toString();
};

/**
 * Reads the trigger's `[data-product-json]` ancestor - every
 * 5dla_product-card-*.liquid root carries one (card 3's reflects its
 * live-selected variant), so this is the only resolution path: no
 * `/products/<handle>.js` fetch fallback anymore (removed - it was
 * root-relative with no locale prefix, so broken on a locale-prefixed
 * storefront, and unreachable anyway once every card got its own
 * `data-product-json`). That shape (Liquid's `product | json`) has no
 * `media`, so this only ever gets a single-image carousel.
 * @param {Element} trigger
 * @returns {object|null}
 */
const resolveProduct = trigger => {
  const jsonHost = trigger.closest(CARD_JSON_SELECTOR);
  if (!jsonHost) return null;

  try {
    return JSON.parse(jsonHost.dataset.productJson);
  } catch (error) {
    return null;
  }
};

/**
 * @param {object} product
 * @param {string|undefined} variantId
 * @returns {object}
 */
const resolveInitialVariant = (product, variantId) => {
  const byId = variantId && product.variants.find(variant => String(variant.id) === String(variantId));
  if (byId) return byId;
  return product.variants.find(variant => variant.available) || product.variants[0];
};

/**
 * Builds the carousel's slide list - prefers `product.media` (images
 * only, no video, per request), falls back to `product.images` (plain
 * URLs - the `data-product-json` shape, or no media at all), then to a
 * single `featured_image` so the carousel is never empty.
 * @param {object} product
 * @returns {{id: string|number|null, src: string, alt: string}[]}
 */
const resolveMediaSlides = product => {
  if (Array.isArray(product.media) && product.media.length) {
    return product.media
      .filter(media => media.media_type !== "video" && media.media_type !== "external_video")
      .map(media => ({
        id: media.id,
        src: media.preview_image?.src || media.src,
        alt: media.alt || product.title,
      }))
      .filter(slide => slide.src);
  }

  if (Array.isArray(product.images) && product.images.length) {
    return product.images.map(image => ({
      id: product.variants.find(variant => variant.featured_image?.src === image)?.featured_image?.id ?? null,
      src: typeof image === "string" ? image : image.src,
      alt: product.title,
    }));
  }

  const fallback = product.featured_image || product.variants[0]?.featured_image;
  if (fallback) {
    const src = typeof fallback === "string" ? fallback : fallback.src;
    return [{ id: fallback.id ?? null, src, alt: product.title }];
  }

  return [];
};

/**
 * (Re)builds the carousel's slides and (re)initializes Swiper against
 * them - destroyed/recreated per product rather than diffed, since this
 * only runs once per modal open.
 * @param {{id: string|number|null, src: string, alt: string}[]} slides
 */
const renderCarousel = slides => {
  if (swiper) {
    swiper.destroy(true, true);
    swiper = null;
  }

  els.carouselWrapper.innerHTML = "";
  slides.forEach(slide => {
    const slideEl = document.createElement("div");
    slideEl.className = "swiper-slide";
    if (slide.id != null) slideEl.dataset.mediaId = String(slide.id);

    const img = document.createElement("img");
    img.src = resizeImage(slide.src, 960);
    img.alt = slide.alt;
    img.loading = "lazy";
    slideEl.append(img);

    els.carouselWrapper.append(slideEl);
  });

  if (!slides.length) return;

  swiper = new Swiper(els.carousel, {
    modules: [Navigation, EffectFade],
    effect: "fade",
    fadeEffect: { crossFade: true },
    speed: 400,
    navigation: {
      prevEl: els.carouselPrev,
      nextEl: els.carouselNext,
    },
  });
};

/**
 * Builds the carousel right away if `shown.bs.modal` already fired
 * (the common case), else stashes slides for `flushPendingCarousel`.
 * Never builds Swiper while the modal is still hidden/transitioning.
 * @param {{id: string|number|null, src: string, alt: string}[]} slides
 */
const applyCarousel = slides => {
  if (modalShown) {
    renderCarousel(slides);
  } else {
    pendingSlides = slides;
  }
};

const flushPendingCarousel = () => {
  if (!pendingSlides) return;
  renderCarousel(pendingSlides);
  pendingSlides = null;
};

/**
 * Slides the carousel to the slide matching the variant's featured media
 * id - ports assets/wpbingo.js's `updateMedia`. No-op if no match.
 * @param {object} variant
 */
const syncCarouselToVariant = variant => {
  if (!swiper) return;

  const mediaId = variant.featured_media?.id ?? variant.featured_image?.id;
  if (mediaId == null) return;

  const index = [...els.carouselWrapper.children].findIndex(slide => slide.dataset.mediaId === String(mediaId));
  if (index !== -1) swiper.slideTo(index);
};

/**
 * Builds the Color/Colour group's values as swatches, not text pills -
 * same `.store-color-option`/`.color-swatch` markup as
 * 5dla_product-card-3-swatches.liquid, so this picks up the same
 * per-color background CSS (sections/customer-variant.liquid).
 * @param {string} value
 * @returns {HTMLElement}
 */
const buildColorSwatchValue = value => {
  const safeValue = String(value).replace(/\//g, "-").replace(/ /g, "-");

  const button = document.createElement("button");
  button.type = "button";
  button.className = "store-color-option";
  button.dataset.value = value;
  button.title = value;

  const swatch = document.createElement("span");
  swatch.className = `color-swatch ${value} ${safeValue}`;
  swatch.setAttribute("aria-hidden", "true");
  button.append(swatch);

  const srText = document.createElement("span");
  srText.className = "sr-only";
  srText.textContent = value;
  button.append(srText);

  return button;
};

/**
 * Builds one option group - color/colour as swatches, anything else as
 * text pills. `.active`/`.disabled` state is applied later by
 * `renderVariant`, which needs the full current selection to compute it.
 * @param {object} product
 * @param {string} optionName - e.g. "Color"
 * @param {number} position - 1-based
 * @param {(position: number, value: string) => void} onSelect
 * @returns {HTMLElement}
 */
const buildOptionGroup = (product, optionName, position, onSelect) => {
  const isColorGroup = ["color", "colour"].includes(optionName.toLowerCase());

  const group = document.createElement("div");
  group.className = "c5dla-quick-view__option-group";

  const label = document.createElement("span");
  label.className = "c5dla-quick-view__option-label";
  label.textContent = optionName;
  group.append(label);

  const values = [...new Set(product.variants.map(variant => variantOptionValue(variant, position)))];

  const list = document.createElement("div");
  list.className = isColorGroup
    ? "product-swatches wpb-variants-swatch c5dla-quick-view__swatches"
    : "c5dla-quick-view__option-values";
  if (isColorGroup) list.setAttribute("aria-label", "Available product colours");

  values.forEach(value => {
    const button = isColorGroup ? buildColorSwatchValue(value) : document.createElement("button");
    if (!isColorGroup) {
      button.type = "button";
      button.className = "c5dla-quick-view__option-value";
      button.textContent = value;
      button.dataset.value = value;
    }
    button.addEventListener("click", () => onSelect(position, value));
    list.append(button);
  });

  group.append(list);
  return group;
};

/**
 * Re-renders everything that depends on the current variant: price,
 * add-to-cart state, availability text (ports `updateProductAvaiable`),
 * carousel slide, and each option's active/selected/disabled value.
 *
 * Disabled state is recomputed HERE, not at build time, against the FULL
 * current selection (via ./variant-resolve.js's `isValueAvailable`,
 * shared with ./variant-state.js's `refreshDisabledStates`) - picking a
 * color can disable sizes and vice versa, which only a live,
 * every-position-known selection can answer correctly.
 * @param {object} product
 * @param {object} variant
 */
const renderVariant = (product, variant) => {
  els.price.textContent = formatMoney(variant.price);
  els.variantInput.value = variant.id;
  els.submit.disabled = !variant.available;
  els.submitLabel.textContent = variant.available
    ? els.submit.dataset.addToCartLabel
    : els.submit.dataset.soldOutLabel;

  els.available.classList.toggle("c5dla-quick-view__available--in-stock", variant.available);
  els.available.classList.toggle("c5dla-quick-view__available--out-stock", !variant.available);
  els.availableText.textContent = variant.available
    ? els.available.dataset.inStockLabel
    : els.available.dataset.outStockLabel;

  syncCarouselToVariant(variant);

  const selected = {};
  product.options.forEach((_name, index) => {
    const position = index + 1;
    selected[position] = variantOptionValue(variant, position);
  });

  els.options.querySelectorAll("[data-value]").forEach(el => {
    const position = Number(el.closest("[data-position]")?.dataset.position);
    const value = el.dataset.value;
    const isAvailable = isValueAvailable(product, position, value, selected);

    el.classList.toggle("active", selected[position] === value);
    el.classList.toggle("disabled", !isAvailable);
    if (el.matches("button")) el.disabled = !isAvailable;
  });
};

/**
 * Renders the modal's static-per-product parts once per open, then
 * variant-dependent parts via `renderVariant`. Option selection resolves
 * a new variant via ./variant-resolve.js, same exact-match-then-anchor
 * strategy as variant.js's card picker.
 * @param {object} product
 * @param {object} initialVariant
 */
const renderProduct = (product, initialVariant) => {
  els.title.textContent = product.title;
  // `product.url` doesn't exist on the `data-product-json` fast path
  // (left this rendering a literal `href="undefined"`) - `product.handle`
  // is present either way.
  els.fullLink.href = product.url || `/products/${product.handle}`;
  els.qtyInput.value = 1;

  applyCarousel(resolveMediaSlides(product));

  if (product.vendor) {
    els.vendor.textContent = product.vendor;
    els.vendor.href = `/pages/${product.vendor.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    els.vendor.hidden = false;
  } else {
    els.vendor.hidden = true;
  }

  els.options.innerHTML = "";
  let selected = {};
  product.options.forEach((_name, index) => {
    const position = index + 1;
    selected[position] = variantOptionValue(initialVariant, position);
  });

  const onSelect = (position, value) => {
    const candidate = { ...selected, [position]: value };
    const variant =
      findExactVariant(product, candidate) || findAnchorVariant(product, position, value) || initialVariant;

    selected = {};
    product.options.forEach((_name, index) => {
      const pos = index + 1;
      selected[pos] = variantOptionValue(variant, pos);
    });

    renderVariant(product, variant);
  };

  product.options.forEach((name, index) => {
    const position = index + 1;
    // Only an option with more than one real value is worth a picker.
    const values = new Set(product.variants.map(variant => variantOptionValue(variant, position)));
    if (values.size <= 1) return;

    const group = buildOptionGroup(product, name, position, onSelect);
    group.dataset.position = String(position);
    els.options.append(group);
  });

  renderVariant(product, initialVariant);
};

const openLoading = () => {
  els.content.hidden = true;
  els.loading.hidden = false;
};

const openContent = () => {
  els.loading.hidden = true;
  els.content.hidden = false;
};

/**
 * @param {Element} trigger
 */
const openQuickView = trigger => {
  if (!resolveEls()) return;

  openLoading();
  els.activeTrigger = trigger;
  bsModal.show();

  const product = resolveProduct(trigger);
  if (!product || !Array.isArray(product.variants) || !product.variants.length) {
    bsModal.hide();
    return;
  }

  const initialVariant = resolveInitialVariant(product, trigger.dataset.variantId);
  renderProduct(product, initialVariant);
  openContent();
};

/**
 * Idempotent - exported so collection.js stays the single place wiring up
 * every collection-page module.
 */
export const initQuickView = () => {
  if (bound) return;
  bound = true;

  document.addEventListener("click", event => {
    const trigger = event.target.closest(TRIGGER_SELECTOR);
    if (!trigger) return;

    event.preventDefault();
    openQuickView(trigger);
  });
};
