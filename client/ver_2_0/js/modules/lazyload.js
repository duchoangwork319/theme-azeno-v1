"use strict";

// Custom image lazyload for snippets/5dla_product-card-*.liquid - NOT
// native `loading="lazy"` (per request: "Load it only once and only load
// those image on scroll" needed real control over WHEN the fetch starts
// and a one-time guarantee, neither of which the native attribute alone
// gives you). Every product card image is wrapped in a `<span
// class="c5dla-media-wrap c5dla-skeleton">` (snippets/5dla_product-card-
// media.liquid) - the WRAPPER carries the skeleton/shimmer (client/
// ver_2_0/scss/collection/_product-grid.scss) and hides its own `<img>`,
// not the other way around, because a deferred `<img>` has no `src` at
// all (see below) and isn't reliably sized by CSS in every browser until
// it has one - the wrapper's size never depends on the `<img>`'s own
// state, so the skeleton is always the right size. `c5dla-skeleton` is a
// single, generic, reusable class (not a base+modifier pair): this module
// REMOVES it outright once the image finishes loading, which both stops
// the shimmer and reveals the `<img>` in one step (same CSS rule drives
// both). See each card's own top comment for how `index`/`section.
// settings.start_image_lazyload_at` (sections/5dla_collection-product-
// grid.liquid) decides eager vs. deferred:
//   - Eager (first N products): real `src` is already in the markup -
//     this only tracks its `load` event to remove the skeleton.
//   - Deferred: `data-src` holds the real URL, no `src` at all - this
//     observes its WRAPPER with an IntersectionObserver and only sets the
//     `<img>`'s `.src` (so the browser actually starts fetching) once it
//     scrolls near the viewport, same skeleton-removal-on-load after that.
//
// `data-src` doubles as the "not loaded yet" marker: once set to `.src`,
// it's deleted, so re-running `initLazyload` (after pagination/filter-sort
// swap in new cards, like every other `init*` in client/ver_2_0/js/
// collection.js) never re-observes or re-fetches an image twice ("load it
// ONLY once" - also why the IntersectionObserver `unobserve`s a wrapper
// the moment its image starts loading, rather than leaving it watched).

const SKELETON_SELECTOR = ".c5dla-skeleton";
const PENDING_SELECTOR = `${SKELETON_SELECTOR}:not([data-c5dla-lazy-bound])`;

let observer = null;

/**
 * Removing the class (not adding a modifier) both stops the shimmer AND
 * reveals `wrapper`'s `<img>` - see this module's own top comment.
 * @param {HTMLElement} wrapper
 */
const markLoaded = wrapper => {
  wrapper.classList.remove("c5dla-skeleton");
};

/**
 * Removes `wrapper`'s skeleton once `img` actually finishes loading (or
 * fails - better a broken image without a stuck shimmer forever than the
 * reverse). If the browser already finished loading it before this ran
 * (e.g. an eager image, served from cache, by the time JS executes), skip
 * straight to `markLoaded` - a `load` event only fires once, and it may
 * already have fired.
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
 * Promotes a deferred image's `data-src` to a real `src` (the browser
 * only starts fetching once this happens) and deletes `data-src` so this
 * image is never picked up again by a later `initLazyload` re-scan.
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
 * One shared IntersectionObserver for every deferred image's wrapper on
 * the page - `rootMargin` starts the real fetch a bit before the image
 * actually enters the viewport, so it's more likely already loaded (or at
 * least started) by the time the shopper scrolls to it.
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
 * Binds every not-yet-processed `.c5dla-skeleton` wrapper under `root`
 * (default: whole document) - its `<img>`'s `data-src` present means
 * "deferred, observe the WRAPPER"; absent means "eager, already has its
 * real `src`, just track its own load for skeleton removal". Idempotent
 * via `data-c5dla-lazy-bound` (same pattern as client/ver_2_0/js/modules/
 * variant.js's `data-variant-js-bound`), so re-running this after
 * client/ver_2_0/js/collection.js appends/swaps in more cards never
 * re-binds (or re-observes/re-fetches) an image already handled.
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
