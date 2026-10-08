"use strict";

// Pure, DOM-free variant-resolution helpers shared by
// client/ver_2_0/js/modules/variant.js (snippets/5dla_product-card-3.liquid's
// inline swatch/size picker) and ./quick-view.js (the shared Quick View
// modal - snippets/5dla_quick-view-modal.liquid) - both need to turn a
// Shopify `product` payload (variants[]/options[], e.g. from
// `data-product-json` or `/products/<handle>.js`) plus a candidate
// option selection into a matching variant, so the logic lives here once
// instead of being duplicated per caller.

import { variantOptionValue } from "./variant-state.js";

/**
 * Finds the 1-based `optionN` position for an option name, matching
 * snippets/5dla_product-card-3-swatches.liquid's/
 * snippets/5dla_product-size-selector.liquid's own name matching
 * ("Color"/"Colour", "Size").
 * @param {string[]} optionNames - product.options
 * @param {string[]} candidates
 * @returns {number|null}
 */
export const findOptionPosition = (optionNames, candidates) => {
  const index = optionNames.findIndex(name => candidates.includes(name));
  return index === -1 ? null : index + 1;
};

/**
 * A variant whose value at EVERY position in `selected` matches - the
 * "exact combo" the current full selection maps to, if one exists.
 * @param {object} product
 * @param {Record<number, string>} selected - position -> value
 * @returns {object|undefined}
 */
export const findExactVariant = (product, selected) =>
  product.variants.find(variant =>
    Object.entries(selected).every(([position, value]) => variantOptionValue(variant, Number(position)) === value)
  );

/**
 * Fallback when no exact combo exists for the candidate selection (e.g.
 * this color + the previously selected size isn't a real variant): anchors
 * directly to a variant that has this value at this position - prefers an
 * AVAILABLE one, else just the first match (so a fully out-of-stock value
 * still anchors to something real).
 * @param {object} product
 * @param {number} position
 * @param {string} value
 * @returns {object|undefined}
 */
export const findAnchorVariant = (product, position, value) => {
  const matches = product.variants.filter(variant => variantOptionValue(variant, position) === value);
  return matches.find(variant => variant.available) || matches[0];
};
