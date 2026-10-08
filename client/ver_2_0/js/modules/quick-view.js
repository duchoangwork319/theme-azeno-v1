"use strict";

// Shared Quick View modal (snippets/5dla_quick-view-modal.liquid, rendered
// once per page from layout/theme.liquid - see that snippet's own top
// comment, including its port notes from the legacy
// `#quickiew-tempvlate` template in snippets/site-template.liquid /
// assets/wpbingo.js's `wpbingo.QuickView`). Reusable by ANY
// snippets/5dla_product-card-*.liquid: a card only needs a
// `[data-quick-view-trigger]` button - this file binds a single DELEGATED
// click listener on `document` rather than per-card like
// client/ver_2_0/js/modules/variant.js does, so:
//   - a brand new card variant works the moment it renders that button,
//     with no JS changes here and no new init call;
//   - cards appended later (pagination/AJAX grid swap - see
//     client/ver_2_0/js/collection.js) work automatically too, since the
//     listener was never bound to specific elements in the first place.
//
// Variant resolution reuses ./variant-resolve.js (shared with variant.js)
// and ./variant-state.js's `variantOptionValue`/`formatMoney` so this
// doesn't reimplement either.
//
// The modal itself is Bootstrap 5's own `Modal` component
// (https://getbootstrap.com/docs/5.3/components/modal/, already a project
// dependency - `bootstrap/js/dist/tab` is already imported by
// client/ver_2_0/js/collection.js, and collection.scss does a full
// `@import "bootstrap/scss/bootstrap"`) - show/hide, the backdrop,
// Escape-to-close, body scroll lock, and focus trap/return are all handled
// by Bootstrap; this file only populates the modal's content and reacts to
// its `shown.bs.modal`/`hidden.bs.modal` events.
//
// Image carousel: the legacy modal uses Slick (assets/wpbingo.js's
// `createImageCarousel`, `fade: true, infinite: false`, arrows from
// Slick's own defaults) - per request this uses Swiper instead (already a
// project dependency, see package.json), same fade transition + prev/next
// arrow buttons, swapped library. `swiper/css`/`swiper/css/navigation`/
// `swiper/css/effect-fade` are imported here (not from the SCSS side) -
// client/ver_2_0/js/collection.js (this module's only importer) has no
// linked stylesheet of its own, so Vite injects this CSS at runtime via a
// `<style>` tag instead of emitting a separate asset - see that file's own
// top comment. Swiper is only ever instantiated AFTER Bootstrap's
// `shown.bs.modal` fires (see `applyCarousel`/`flushPendingCarousel`
// below) - initializing it earlier, while `.modal` still has `display:
// none`/is mid-transition, made Swiper measure a zero/bogus container
// width and produce a wildly oversized layout (the element's own [data-
// c5dla-quick-view-media] column rendering as ~33,554,400px wide).

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
const productCache = new Map();

const els = {};
let swiper = null;
let bsModal = null;
let modalShown = false;
let pendingSlides = null;

/**
 * Caches every `[data-c5dla-quick-view-*]` element from the single shared
 * modal (snippets/5dla_quick-view-modal.liquid) once, on first use -
 * there's only ever one instance of this modal per page (see that
 * snippet's own comment), so no scoping/root param is needed here, unlike
 * client/ver_2_0/js/modules/variant.js's per-card lookups.
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

  // Swiper can only be safely initialized once the modal is actually
  // visible at its real size - see this module's own top comment.
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
 * Resizes a Shopify CDN image URL via its `width` query param - same
 * transform as ./variant-state.js's own (unexported) `resizeImage`, kept
 * local here since this is the only other caller.
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
 * Fetches `/products/<handle>.js` (Shopify's product JSON endpoint),
 * cached per handle so repeat opens of the same product don't re-fetch.
 * @param {string} handle
 * @returns {Promise<object|null>}
 */
const fetchProduct = async handle => {
  if (productCache.has(handle)) return productCache.get(handle);

  const request = fetch(`/products/${handle}.js`, { headers: { "X-Requested-With": "XMLHttpRequest" } })
    .then(response => (response.ok ? response.json() : null))
    .catch(() => null);

  productCache.set(handle, request);
  const product = await request;
  if (!product) productCache.delete(handle);
  return product;
};

/**
 * Prefers the clicked trigger's own `[data-product-json]` ancestor (card
 * 3's `[data-variant-picker]` root - already has the live-selected variant
 * baked in, no network round trip) over fetching - see
 * snippets/5dla_quick-view-modal.liquid's top comment for why this is
 * optional, not required, for a new card variant to work. Note the
 * `data-product-json` shape (Liquid's `product | json`) doesn't include
 * `media` the way `/products/<handle>.js` does, so a card using this path
 * only gets a single-image "carousel" (the variant's own featured image) -
 * acceptable since the fetch path is always available as a fallback for
 * any card that cares about the full media list.
 * @param {Element} trigger
 * @returns {Promise<object|null>}
 */
const resolveProduct = async trigger => {
  const jsonHost = trigger.closest(CARD_JSON_SELECTOR);
  if (jsonHost) {
    try {
      const product = JSON.parse(jsonHost.dataset.productJson);
      if (product) return product;
    } catch (error) {
      // Falls through to the fetch below.
    }
  }

  const handle = trigger.dataset.handle;
  if (!handle) return null;
  return fetchProduct(handle);
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
 * Builds the image slide list for the carousel - prefers `product.media`
 * (the `/products/<handle>.js` shape, image entries only - ports
 * assets/wpbingo.js's `buildQuickView` filtering `media_type !== 'video'`;
 * video slides aren't ported, this carousel is images-only per request),
 * falling back to `product.images` (plain URL strings - both the
 * `data-product-json` shape, see `resolveProduct`'s own comment, and
 * products with no `media` at all) when there's no media array, and
 * finally to the single `featured_image`/`variants[0].featured_image` so
 * the carousel never ends up empty.
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
 * (Re)builds `[data-c5dla-quick-view-carousel-wrapper]`'s slides and
 * (re)initializes Swiper against them - destroyed and recreated per
 * product (simpler than diffing slide counts/than Swiper's own
 * `removeAllSlides`/`appendSlide`, and this only runs once per modal
 * open). `effect: "fade"` + `navigation` (prev/next arrow buttons) mirrors
 * the legacy carousel's `slick({fade: true, infinite: false})` - see this
 * module's own top comment.
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
 * Builds the carousel right away if the modal is already fully shown
 * (`shown.bs.modal` already fired - the common case, since Bootstrap's
 * show transition is usually faster than the `/products/<handle>.js`
 * fetch this follows), otherwise stashes the slides for
 * `flushPendingCarousel` to build once that event does fire. Never builds
 * Swiper while the modal is still hidden/transitioning - see this module's
 * own top comment for why that matters.
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
 * Slides the carousel to the slide whose `data-media-id` matches the
 * variant's `featured_media`/`featured_image` id - ports
 * assets/wpbingo.js's `updateMedia` (which does the same lookup against
 * Slick's `.quickview-images__item[data-media-id]`), swapped for Swiper's
 * `slideTo`. A no-op when the variant has no featured media (most
 * single-image products) or there's no matching slide, same as the legacy
 * version.
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
 * Builds the Color/Colour group's values as color swatches instead of text
 * pills - the exact same `.store-color-option`/`.color-swatch` markup
 * shape as snippets/5dla_product-card-3-swatches.liquid (`wpb-variants-
 * swatch` wrapper, `data-value`, nested `.color-swatch <value> <safe
 * value>` dot + `.sr-only` text) so this modal's swatches look identical
 * to card 3's (per request) and pick up the SAME per-color background
 * CSS that sections/customer-variant.liquid generates against
 * `.wpb-variants-swatch <value>` (a plain class selector, not scoped to
 * any card variant - unaffected by which markup renders it).
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
 * Builds one option group's worth of selectable values - color/colour
 * renders as swatches (see `buildColorSwatchValue`), anything else
 * (size, or any other option name a product defines) as text pills.
 * Per-value `.active`/`.disabled` state is applied later by
 * `renderVariant` (it needs the FULL current selection to compute
 * availability bidirectionally, which isn't known yet on first build - see
 * its own comment), not here.
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
 * add-to-cart state, availability text (ports assets/wpbingo.js's
 * `updateProductAvaiable` in/out-of-stock toggle), the carousel's active
 * slide, and each option group's active/selected/disabled value.
 *
 * Disabled state is recomputed HERE (not once at build time in
 * `buildOptionGroup`) against the FULL current `selected` state, same
 * bidirectional check as ./variant-state.js's `refreshDisabledStates`
 * (via ./variant-resolve.js's `isValueAvailable`, shared with it) -
 * picking a color can disable sizes, AND picking a size can disable
 * colors, which only a live, every-position-known selection can answer
 * correctly (not just "preceding" positions, which is all a first/
 * page-load render can know).
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
 * Renders the modal's static-per-product parts (carousel, title, vendor,
 * option groups, full-details link) once per open, then the
 * variant-dependent parts via `renderVariant`. Option selection resolves a
 * new variant via ./variant-resolve.js, same exact-match-then-anchor
 * strategy as client/ver_2_0/js/modules/variant.js's card picker.
 * @param {object} product
 * @param {object} initialVariant
 */
const renderProduct = (product, initialVariant) => {
  els.title.textContent = product.title;
  // `product.url` only exists on the `/products/<handle>.js` fetch shape -
  // the inline `data-product-json` fast path (Liquid's `product | json`,
  // see `resolveProduct`'s own comment) doesn't include a `url` property at
  // all, which left this `undefined` (rendered as a literal `href="undefined"`)
  // whenever a card used that path. `product.handle` is present either way.
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
const openQuickView = async trigger => {
  if (!resolveEls()) return;

  openLoading();
  els.activeTrigger = trigger;
  bsModal.show();

  const product = await resolveProduct(trigger);
  if (!product || !Array.isArray(product.variants) || !product.variants.length) {
    bsModal.hide();
    return;
  }

  const initialVariant = resolveInitialVariant(product, trigger.dataset.variantId);
  renderProduct(product, initialVariant);
  openContent();
};

/**
 * Idempotent - safe to call more than once (client/ver_2_0/js/collection.js
 * only needs to call it once; it's exported mainly so that entry stays the
 * single place that wires up every collection-page module, same as
 * `initVariantPickers`/`initFilterSort`/`initPriceRangeSlider`).
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
