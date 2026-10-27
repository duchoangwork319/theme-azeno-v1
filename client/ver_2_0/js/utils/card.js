"use strict";

// Shared by collection.js (`.products`) and modules/product-carousel.js
// (a Swiper `.swiper-wrapper` instead of a grid) - same card markup/
// classes either way (see _product-grid.scss's top comment).

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
 * Equalizes product card heights - ports `wpbingo.ensureHeightEqual`.
 * Re-run after cards are added/swapped (e.g. loadNextPage appending cards,
 * or a Swiper instance initializing). Searches the whole document by
 * default; pass `wrapper` to scope the search to one container instead
 * (e.g. a specific `.swiper-wrapper`) rather than every card on the page.
 * @param {HTMLElement} [wrapper]
 */
export const ensureCardHeightEqual = wrapper => {
  const root = wrapper || document;
  const prefixCard1 = "article.c5dla-card-1 .product-copy";
  const prefixCard3 = "article.c5dla-card-3 .product-info";
  makeHeightEqual(root.querySelectorAll(`${prefixCard1} .product-name`));
  makeHeightEqual(root.querySelectorAll(`${prefixCard1} > .product-short-description`));

  makeHeightEqual(root.querySelectorAll(`${prefixCard3} h3 a`));
  makeHeightEqual(root.querySelectorAll(`${prefixCard3} .product-swatches`));
  makeHeightEqual(root.querySelectorAll(`${prefixCard3} .size-selector`));
};
