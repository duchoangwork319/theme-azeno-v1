"use strict";

// This entry's SCSS lives in the sibling css-collection.js entry (kept
// separate so THIS entry builds as "iife" - window-safe when minified -
// while the CSS-only entry stays "es" so Vite extracts a linked .css file).
// Exception: Swiper's stylesheet (imported by ./modules/quick-view.js) has
// no linked file here, so Vite injects it via a runtime `<style>` tag -
// expected, not a bug, if a built bundle has no matching .css for it.
import { initVariantPickers } from "./modules/variant.js";
import { initFilterSort } from "./modules/filter-sort.js";
import { initPriceRangeSlider } from "./modules/price-range-slider.js";
import { initQuickView } from "./modules/quick-view.js";
import { initLazyload } from "./modules/lazyload.js";
// Tab component only (not bootstrap.bundle, which also pulls in Popper) -
// the import alone wires up `[data-bs-toggle="tab"]` via Bootstrap's data-api.
import "bootstrap/js/dist/tab";

const PAGINATION_SELECTOR = "[data-c5dla-pagination]";
const PRODUCTS_SELECTOR = ".products";
const SENTINEL_SELECTOR = "[data-c5dla-infinite-sentinel]";

let paginationLoading = false;

/**
 * Fetches the next page via the Section Rendering API (`?sections=<id>`),
 * appends its products to `.products`, and swaps in the response's own
 * pagination state (or removes the container if there's no next page).
 * Shared by the "load more" button and infinite scroll - ports assets/
 * wpbingo.js's `ajaxFilterInfinity`, without jQuery, scoped to this section.
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
      // Both idempotent, so re-scanning the whole document for newly
      // appended cards is simpler than targeting just the new nodes.
      initVariantPickers();
      initLazyload();
    }

    const newPagination = parsed.querySelector(PAGINATION_SELECTOR);
    if (newPagination && newPagination.dataset.nextUrl) {
      // Same node stays in the DOM (just its next-page pointer changes) -
      // the sentinel's IntersectionObserver doesn't need re-binding.
      pagination.dataset.nextUrl = newPagination.dataset.nextUrl;
    } else {
      pagination.remove();
    }
  } catch (error) {
    // Fall back to a real navigation rather than reimplement error recovery.
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
 * Ports assets/wpbingo.js's `ajaxFilterInfinity` scroll-near-bottom check,
 * using IntersectionObserver (`rootMargin` triggers it just before the
 * sentinel reaches the viewport) instead of scroll-event polling.
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
 * Ports assets/wpbingo.js's `makeHeightEqual`: sets every element to the
 * tallest one's height (so varying-length text still lines up), resetting
 * to `auto` first in case a previous, taller measurement is stale.
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
 * Equalizes product card heights in `.products` - ports
 * `wpbingo.ensureHeightEqual`. Re-run after `loadNextPage` appends cards.
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
 * "Show all colours" checkbox - toggles `.show-all-colours` on
 * `.c5dla-scope` (NOT <body> - vite-build.mjs's prefixer rewrites `.scope`
 * for <main>, not body), revealing every card's extra swatches at once.
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
  // One delegated document listener - never needs re-running after a grid
  // swap, unlike the re-inits below.
  initQuickView();
  // Re-runs whatever depends on `.products`/pagination after filter-sort.js
  // swaps in a freshly rendered grid (same re-inits loadNextPage needs).
  initFilterSort({
    onGridUpdated: () => {
      ensureCardHeightEqual();
      initVariantPickers();
      initInfiniteScroll();
      initPriceRangeSlider();
      initLazyload();
    },
  });
  initPriceRangeSlider();
  initLoadMore();
  initInfiniteScroll();
  ensureCardHeightEqual();
  initVariantPickers();
  initLazyload();
});
