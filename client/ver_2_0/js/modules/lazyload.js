"use strict";

// Custom image lazyload for snippets/5dla_product-card-*.liquid - NOT
// native `loading="lazy"` (per request: "Load it only once and only load
// those image on scroll" needed real control over WHEN the fetch starts
// and a one-time guarantee, neither of which the native attribute alone
// gives you). Every product card image carries `.c5dla-lazy-img`
// (skeleton styling - client/ver_2_0/scss/collection/_product-grid.scss)
// regardless of whether it's eager or deferred, so the shimmer shows on
// EVERY image until it actually finishes loading - see each card's own
// top comment for how `index`/`section.settings.start_image_lazyload_at`
// (sections/5dla_collection-product-grid.liquid) decides eager vs.
// deferred:
//   - Eager (first N products): real `src` is already in the markup -
//     this only tracks its `load` event to remove the skeleton.
//   - Deferred: `data-src` holds the real URL, no `src` at all - this
//     observes it with an IntersectionObserver and only sets `.src` (so
//     the browser actually starts fetching) once it scrolls near the
//     viewport, same skeleton-removal-on-load after that.
//
// `data-src` doubles as the "not loaded yet" marker: once set to `.src`,
// it's deleted, so re-running `initLazyload` (after pagination/filter-sort
// swap in new cards, like every other `init*` in client/ver_2_0/js/
// collection.js) never re-observes or re-fetches an image twice ("load it
// ONLY once" - also why the IntersectionObserver `unobserve`s an image the
// moment it starts loading, rather than leaving it watched).

const SKELETON_SELECTOR = "img.c5dla-lazy-img";
const PENDING_SELECTOR = `${SKELETON_SELECTOR}:not([data-c5dla-lazy-bound])`;

let observer = null;

/**
 * @param {HTMLImageElement} img
 */
const markLoaded = img => {
  img.classList.add("is-loaded");
};

/**
 * Removes the skeleton once `img` actually finishes loading (or fails -
 * better a broken image without a stuck shimmer forever than the
 * reverse). If the browser already finished loading it before this ran
 * (e.g. an eager image, served from cache, by the time JS executes), skip
 * straight to `markLoaded` - a `load` event only fires once, and it may
 * already have fired.
 * @param {HTMLImageElement} img
 */
const trackLoad = img => {
  if (img.complete && img.naturalWidth > 0) {
    markLoaded(img);
    return;
  }
  img.addEventListener("load", () => markLoaded(img), { once: true });
  img.addEventListener("error", () => markLoaded(img), { once: true });
};

/**
 * Promotes a deferred image's `data-src` to a real `src` (the browser
 * only starts fetching once this happens) and deletes `data-src` so this
 * image is never picked up again by a later `initLazyload` re-scan.
 * @param {HTMLImageElement} img
 */
const loadDeferredImage = img => {
  const src = img.dataset.src;
  if (!src) return;

  delete img.dataset.src;
  img.src = src;
  trackLoad(img);
};

/**
 * One shared IntersectionObserver for every deferred image on the page -
 * `rootMargin` starts the real fetch a bit before the image actually
 * enters the viewport, so it's more likely already loaded (or at least
 * started) by the time the shopper scrolls to it.
 * @returns {IntersectionObserver}
 */
const getObserver = () => {
  if (observer) return observer;

  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        loadDeferredImage(entry.target);
      });
    },
    { rootMargin: "600px 0px" }
  );

  return observer;
};

/**
 * Binds every not-yet-processed `.c5dla-lazy-img` under `root` (default:
 * whole document) - `data-src` present means "deferred, observe it";
 * absent means "eager, already has its real `src`, just track its own
 * load for skeleton removal". Idempotent via `data-c5dla-lazy-bound`
 * (same pattern as client/ver_2_0/js/modules/variant.js's
 * `data-variant-js-bound`), so re-running this after
 * client/ver_2_0/js/collection.js appends/swaps in more cards never
 * re-binds (or re-observes/re-fetches) an image already handled.
 * @param {ParentNode} [root]
 */
export const initLazyload = (root = document) => {
  root.querySelectorAll(PENDING_SELECTOR).forEach(img => {
    img.dataset.c5dlaLazyBound = "true";

    if (img.dataset.src) {
      getObserver().observe(img);
    } else {
      trackLoad(img);
    }
  });
};
