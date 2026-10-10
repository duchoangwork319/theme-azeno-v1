"use strict";

// Custom image lazyload for snippets/5dla_product-card-*.liquid - NOT
// native `loading="lazy"`, which can't guarantee a one-time load on scroll.
// Each image is wrapped in `<span class="c5dla-media-wrap c5dla-skeleton">`
// (5dla_product-card-media.liquid); the WRAPPER (not the `<img>`) carries
// the skeleton, since a deferred `<img>` with no `src` isn't reliably
// sized by CSS until it has one. `c5dla-skeleton` is a single class, not a
// base+modifier pair: removing it on load both stops the shimmer and
// reveals the `<img>` (same CSS rule drives both).
//
// `index`/`section.settings.start_image_lazyload_at` decides eager
// (real `src` already in the markup - just track `load`) vs. deferred
// (`data-src` only - observed and promoted to `.src` on scroll-near).
// `data-src` doubles as the "pending" marker: deleted once promoted, so
// re-running `initLazyload` (after a grid swap) never double-fetches.

const SKELETON_SELECTOR = ".c5dla-skeleton";
const PENDING_SELECTOR = `${SKELETON_SELECTOR}:not([data-c5dla-lazy-bound])`;

let observer = null;

/**
 * @param {HTMLElement} wrapper
 */
const markLoaded = wrapper => {
  wrapper.classList.remove("c5dla-skeleton");
};

/**
 * Removes `wrapper`'s skeleton once `img` loads (or errors - better a
 * broken image than a stuck shimmer). Checks `img.complete` first in case
 * it already finished (e.g. cached) before a `load` listener could catch it.
 * @param {HTMLElement} wrapper
 * @param {HTMLImageElement} img
 */
const trackLoad = (wrapper, img) => {
  if (img.complete && img.naturalWidth > 0) {
    markLoaded(wrapper);
    return;
  }
  img.addEventListener("load", () => markLoaded(wrapper), { once: true });
  img.addEventListener("error", () => markLoaded(wrapper), { once: true });
};

/**
 * Promotes `data-src` to a real `src` (starting the fetch) and deletes
 * `data-src` so a later `initLazyload` re-scan never picks it up again.
 * @param {HTMLElement} wrapper
 * @param {HTMLImageElement} img
 */
const loadDeferredImage = (wrapper, img) => {
  const src = img.dataset.src;
  if (!src) return;

  delete img.dataset.src;
  img.src = src;
  trackLoad(wrapper, img);
};

/**
 * One shared IntersectionObserver - `rootMargin` starts the fetch a bit
 * before the image enters the viewport.
 * @returns {IntersectionObserver}
 */
const getObserver = () => {
  if (observer) return observer;

  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        const img = entry.target.querySelector("img");
        if (img) loadDeferredImage(entry.target, img);
      });
    },
    { rootMargin: "600px 0px" }
  );

  return observer;
};

/**
 * Binds every not-yet-processed `.c5dla-skeleton` wrapper under `root`:
 * `data-src` present means deferred (observe it); absent means eager
 * (just track load). Idempotent via `data-c5dla-lazy-bound`, same pattern
 * as variant.js's `data-variant-js-bound`.
 * @param {ParentNode} [root]
 */
export const initLazyload = (root = document) => {
  root.querySelectorAll(PENDING_SELECTOR).forEach(wrapper => {
    wrapper.dataset.c5dlaLazyBound = "true";

    const img = wrapper.querySelector("img");
    if (!img) return;

    if (img.dataset.src) {
      getObserver().observe(wrapper);
    } else {
      trackLoad(wrapper, img);
    }
  });
};
