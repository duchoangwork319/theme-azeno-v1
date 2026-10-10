"use strict";

// Color-swatch / size-button variant switching for
// snippets/5dla_product-card-3.liquid - see its own top comment for the
// full `data-*`/`dynamic="*"` contract. Exported so collection.js can
// re-run it after appending paginated cards.
//
// DOM state (`[dynamic]` fields, active/selected, disabled) lives in
// ./variant-state.js - this file only resolves clicks and orchestrates.

import {
  COLOR_OPTION_SELECTOR,
  SIZE_OPTION_SELECTOR,
  variantOptionValue,
  readSelectedState,
  refreshDisabledStates,
  updateProductTitle,
  updateProductPrice,
  updateProductImage,
  updateQuickViewTrigger,
  updateVariantIdInput,
  updateAddToCartButton,
  updateActiveColorOption,
  updateSelectedSizeOption,
} from "./variant-state.js";
import { findOptionPosition, findExactVariant, findAnchorVariant } from "./variant-resolve.js";

const VARIANT_CARD_SELECTOR = "[data-variant-picker]";

/**
 * Reads a card's `data-product-json` back into the full Shopify product
 * object - `variants[]` and `options` (option NAMES in position order,
 * e.g. `["Color", "Size"]` - see ignore/product.json for the shape).
 * @param {Element} card
 * @returns {object|null}
 */
const readProduct = card => {
  try {
    return JSON.parse(card.dataset.productJson);
  } catch (error) {
    return null;
  }
};

/**
 * Applies `variant` as the card's new selected variant - a thin wrapper
 * over ./variant-state.js's updaters. The image only swaps when the
 * COLOR changed - a plain size change never touches it.
 * @param {Element} card
 * @param {object} product
 * @param {object} variant
 * @param {Record<number, string>} previousSelected
 */
const applyVariant = (card, product, variant, previousSelected) => {
  const selected = {};
  product.options.forEach((_name, index) => {
    const position = index + 1;
    selected[position] = variantOptionValue(variant, position);
  });

  updateProductTitle(card, product);
  updateProductPrice(card, variant);

  const colorPosition = card.dataset.colorPosition ? Number(card.dataset.colorPosition) : null;
  const colorChanged = colorPosition != null && previousSelected[colorPosition] !== selected[colorPosition];
  if (colorChanged) updateProductImage(card, product, variant);

  updateQuickViewTrigger(card, variant);
  updateVariantIdInput(card, variant);
  updateAddToCartButton(card, variant);

  updateActiveColorOption(card, selected, colorPosition);
  const sizePosition = card.dataset.sizePosition ? Number(card.dataset.sizePosition) : null;
  updateSelectedSizeOption(card, selected, sizePosition);

  refreshDisabledStates(card, product, selected);

  card.dataset.currentVariantId = String(variant.id);
};

/**
 * Handles a swatch/size click: builds the full candidate selection,
 * finds an exact variant match, or falls back to `findAnchorVariant` -
 * "snapping" the other option(s) to whatever it has, like a typical
 * Shopify variant picker.
 * @param {Element} card
 * @param {object} product
 * @param {number} position
 * @param {Element} el
 */
const selectOption = (card, product, position, el) => {
  if (el.disabled || el.classList.contains("disabled")) return;

  const previousSelected = readSelectedState(card, product);
  const candidate = { ...previousSelected, [position]: el.dataset.value };

  const variant = findExactVariant(product, candidate) || findAnchorVariant(product, position, el.dataset.value);
  if (!variant) return;

  applyVariant(card, product, variant, previousSelected);
};

/**
 * Wires up one card's color swatches + size buttons. Idempotent via
 * `data-variant-js-bound` so re-running `initVariantPickers` never
 * double-binds an already-initialized card.
 * @param {Element} card
 */
const initCard = card => {
  if (card.dataset.variantJsBound) return;
  card.dataset.variantJsBound = "true";

  const product = readProduct(card);
  if (!product || !Array.isArray(product.variants) || !Array.isArray(product.options)) return;

  const colorPosition = findOptionPosition(product.options, ["Color", "Colour"]);
  const sizePosition = findOptionPosition(product.options, ["Size"]);
  if (colorPosition) card.dataset.colorPosition = String(colorPosition);
  if (sizePosition) card.dataset.sizePosition = String(sizePosition);

  card.addEventListener("click", event => {
    const colorEl = event.target.closest(COLOR_OPTION_SELECTOR);
    if (colorEl && colorPosition) {
      selectOption(card, product, colorPosition, colorEl);
      return;
    }

    const sizeEl = event.target.closest(SIZE_OPTION_SELECTOR);
    if (sizeEl && sizePosition) {
      selectOption(card, product, sizePosition, sizeEl);
    }
  });
};

/**
 * Initializes every `[data-variant-picker]` card under `root` (default:
 * whole document). Exported so client/ver_2_0/js/collection.js can re-run
 * it after appending paginated products into `.products`.
 * @param {ParentNode} [root]
 */
export const initVariantPickers = (root = document) => {
  root.querySelectorAll(VARIANT_CARD_SELECTOR).forEach(initCard);
};
