"use strict";

// Pure, DOM-free variant-resolution helpers shared by ./variant.js
// (card 3's inline picker) and ./quick-view.js - both turn a product
// payload (variants[]/options[]) plus a candidate selection into a
// matching variant, so the logic lives here once.

import { variantOptionValue } from "./variant-state.js";

/**
 * Finds the 1-based `optionN` position for an option name, matching the
 * Liquid side's own "Color"/"Colour"/"Size" name matching.
 * @param {string[]} optionNames - product.options
 * @param {string[]} candidates
 * @returns {number|null}
 */
export const findOptionPosition = (optionNames, candidates) => {
  const index = optionNames.findIndex(name => candidates.includes(name));
  return index === -1 ? null : index + 1;
};

/**
 * A variant matching EVERY position in `selected` - the exact combo the
 * full selection maps to, if one exists.
 * @param {object} product
 * @param {Record<number, string>} selected - position -> value
 * @returns {object|undefined}
 */
export const findExactVariant = (product, selected) =>
  product.variants.find(variant =>
    Object.entries(selected).every(([position, value]) => variantOptionValue(variant, Number(position)) === value)
  );

/**
 * Fallback when no exact combo exists: anchors to a variant with this
 * value at this position - prefers an available one, else the first
 * match (so a fully out-of-stock value still anchors to something real).
 * @param {object} product
 * @param {number} position
 * @param {string} value
 * @returns {object|undefined}
 */
export const findAnchorVariant = (product, position, value) => {
  const matches = product.variants.filter(variant => variantOptionValue(variant, position) === value);
  return matches.find(variant => variant.available) || matches[0];
};

/**
 * Whether `value` at `position` is still choosable given the FULL
 * current selection (every other position) - same bidirectional check as
 * ./variant-state.js's `refreshDisabledStates`, as a pure per-value check
 * so ./quick-view.js can reuse it without its DOM-querying version.
 * @param {object} product
 * @param {number} position
 * @param {string} value
 * @param {Record<number, string>} selected
 * @returns {boolean}
 */
export const isValueAvailable = (product, position, value, selected) =>
  product.variants.some(variant => {
    if (!variant.available || variantOptionValue(variant, position) !== value) return false;
    return Object.entries(selected).every(([otherPosition, otherValue]) => {
      if (Number(otherPosition) === position) return true;
      return variantOptionValue(variant, Number(otherPosition)) === otherValue;
    });
  });
