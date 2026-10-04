"use strict";

// This entry's CSS lives in its own sibling entry, client/ver_2_0/js/
// css-collection.js (see scripts/vite-build.mjs's buildVer2Entry) - kept
// separate so this entry can build as "iife" (window-safe even when
// minified) while the CSS-only entry stays "es" (so Vite still extracts
// it into its own .css file).
import { initVariantPickers } from "./modules/variant.js";
import { initFilterSort } from "./modules/filter-sort.js";
import { initPriceRangeSlider } from "./modules/price-range-slider.js";

const PAGINATION_SELECTOR = "[data-c5dla-pagination]";
const PRODUCTS_SELECTOR = ".products";
const SENTINEL_SELECTOR = "[data-c5dla-infinite-sentinel]";

let paginationLoading = false;

/**
 * Fetches the pagination container's `data-next-url` via the Section
 * Rendering API (`?sections=<id>`), appends the new page's products into
 * the existing `.products` grid, and swaps in the response's own
 * pagination state (its next URL, or removes the container entirely once
 * there's no next page). Shared by both the "load more" button and
 * infinite scroll - ports assets/wpbingo.js's `ajaxFilterInfinity`
 * (fetch-append-replace-pagination-markup), rewritten without jQuery and
 * scoped to just this section instead of also touching sliders/reviews/
 * currency/etc.
 * @param {Element} pagination
 */
const loadNextPage = async pagination => {
  if (paginationLoading) return;

  const nextUrl = pagination.dataset.nextUrl;
  const sectionId = pagination.dataset.sectionId;
  if (!nextUrl || !sectionId) return;

  paginationLoading = true;
  pagination.classList.add("is-loading");

  try {
    const requestUrl = new URL(nextUrl, window.location.origin);
    requestUrl.searchParams.set("sections", sectionId);

    const response = await fetch(requestUrl.toString(), {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });
    if (!response.ok) throw new Error(`Pagination request failed: ${response.status}`);

    const data = await response.json();
    const html = data[sectionId];
    if (!html) return;

    const parsed = new DOMParser().parseFromString(html, "text/html");

    const newProducts = parsed.querySelector(PRODUCTS_SELECTOR);
    const currentProducts = document.querySelector(PRODUCTS_SELECTOR);
    if (newProducts && currentProducts) {
      currentProducts.append(...newProducts.children);
      ensureCardHeightEqual();
      // Newly appended cards (card variant 3's swatches/size buttons)
      // need their own variant.js binding too - initVariantPickers is
      // idempotent (see its own comment), so re-scanning the whole
      // document is safe and simpler than targeting just the new nodes.
      initVariantPickers();
    }

    const newPagination = parsed.querySelector(PAGINATION_SELECTOR);
    if (newPagination && newPagination.dataset.nextUrl) {
      // Same node stays in the DOM (just its next-page pointer changes) so
      // an IntersectionObserver already watching this container's sentinel
      // doesn't need to be re-bound to a replacement element.
      pagination.dataset.nextUrl = newPagination.dataset.nextUrl;
    } else {
      pagination.remove();
    }
  } catch (error) {
    // Fall back to a real navigation so pagination still works without JS
    // having to reimplement error recovery.
    window.location.assign(nextUrl);
  } finally {
    paginationLoading = false;
    pagination.classList.remove("is-loading");
  }
};

const initLoadMore = () => {
  document.addEventListener("click", event => {
    const button = event.target.closest("[data-c5dla-loadmore]");
    if (!button) return;
    const pagination = button.closest(PAGINATION_SELECTOR);
    if (pagination) loadNextPage(pagination);
  });
};

/**
 * Ports assets/wpbingo.js's `ajaxFilterInfinity`: a scroll-position check
 * ("within ~2000px of the bottom, and not already loading") that fetches
 * the next page. Uses IntersectionObserver instead of a raw `scroll`
 * listener + manual document-height math - same trigger semantics
 * (loads shortly before the sentinel would actually reach the viewport,
 * via `rootMargin`), no scroll-event polling.
 */
const initInfiniteScroll = () => {
  const sentinel = document.querySelector(SENTINEL_SELECTOR);
  if (!sentinel) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const pagination = sentinel.closest(PAGINATION_SELECTOR);
        if (pagination && pagination.dataset.paginationStyle === "infinite") {
          loadNextPage(pagination);
        }
      });
    },
    { rootMargin: "800px 0px" }
  );

  observer.observe(sentinel);
};

/**
 * Ports assets/wpbingo.js's `makeHeightEqual`: sets every element in the
 * collection to the tallest one's height, so cards with shorter content
 * (description/headline/feature text of varying length) still line up
 * with their taller neighbours - CSS grid's own row-stretch already
 * equalizes the `article` root, but not stray inline heights left over
 * from a previous, taller state, so this resets to `auto` before
 * remeasuring.
 * @param {NodeListOf<Element>} elements
 */
const makeHeightEqual = elements => {
  if (!elements.length) return;

  elements.forEach(el => {
    el.style.height = "auto";
  });

  const maxHeight = Math.max(...Array.from(elements, el => el.getBoundingClientRect().height));
  if (!Number.isFinite(maxHeight) || maxHeight <= 0) return;

  elements.forEach(el => {
    el.style.height = `${maxHeight}px`;
  });
};

/**
 * Equalizes every product card's height in `.products` (whichever
 * 5dla_product-card-1/2/3 variant is rendered - see
 * sections/5dla_collection-product-grid.liquid) - ports
 * `wpbingo.ensureHeightEqual`'s intent for this grid. Re-run after
 * `loadNextPage` appends more cards (see below), since new cards join
 * the same grid and need to be measured against the existing ones too.
 */
const ensureCardHeightEqual = () => {
  const prefixCard1 = "article.c5dla-card-1 .product-copy";
  const prefixCard3 = "article.c5dla-card-3 .product-info";
  makeHeightEqual(document.querySelectorAll(`${prefixCard1} .product-name`));
  makeHeightEqual(document.querySelectorAll(`${prefixCard1} > .product-short-description`));

  makeHeightEqual(document.querySelectorAll(`${prefixCard3} h3 a`));
  makeHeightEqual(document.querySelectorAll(`${prefixCard3} .product-swatches`));
  makeHeightEqual(document.querySelectorAll(`${prefixCard3} .size-selector`));
};

/**
 * "Show all colours" checkbox (sections/5dla_collection-product-grid.liquid) -
 * toggles `.show-all-colours` on `.c5dla-scope` (this template's <main>,
 * not <body> - see scripts/vite-build.mjs's postcss-prefix-selector
 * setup for why it has to be the actual scoped root), which reveals every
 * product card's `.swatch--extra` swatches and hides the "+N" count (see
 * client/ver_2_0/scss/collection/_product-grid.scss and
 * snippets/5dla_product-card-1-swatches.liquid). A single page-wide class rather
 * than per-card state, matching the reference's own client-side behavior
 * (one toggle affecting every card's swatch list at once).
 */
const initColorsToggle = () => {
  const checkbox = document.querySelector("[data-c5dla-colors-toggle]");
  const scopeRoot = document.querySelector(".c5dla-scope");
  if (!checkbox || !scopeRoot) return;

  checkbox.addEventListener("change", () => {
    scopeRoot.classList.toggle("show-all-colours", checkbox.checked);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initColorsToggle();
  initFilterSort();
  initPriceRangeSlider();
  initLoadMore();
  initInfiniteScroll();
  ensureCardHeightEqual();
  initVariantPickers();
});
