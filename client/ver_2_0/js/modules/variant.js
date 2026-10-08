"use strict";

// Color-swatch / size-button variant switching for
// snippets/5dla_product-card-3.liquid - see that snippet's own top
// comment for the full `data-*`/`dynamic="*"` contract this relies on.
// Exported (not self-initializing) so client/ver_2_0/js/collection.js can
// both init it on first load AND re-run it after appending paginated
// products into `.products` (new cards need binding too).
//
// DOM state (`[dynamic]` fields, active/selected classes, disabled
// states) lives in ./variant-state.js - this file only resolves clicks to
// a variant and orchestrates applying it.

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
 * Reads a card's `data-product-json` (`{{ product | json | escape }}` in
 * snippets/5dla_product-card-3.liquid) back into the full Shopify product
 * object - `variants[]` (each with `option1`/`option2`/`option3`,
 * `available`, `price`, `featured_image`, ...) and `options` (an array of
 * OPTION NAMES in position order, e.g. `["Color", "Size"]` - see
 * ignore/product.json for the full shape this mirrors).
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
 * over ./variant-state.js's individual field/class updaters, run in
 * sequence. The product image only swaps when the COLOR actually changed
 * (per request) - a plain size change never touches it.
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
 * Handles a swatch/size click: builds the full candidate selection (every
 * OTHER position keeps its last known value, this position gets the
 * clicked value), looks for an exact variant match, and falls back to
 * `findAnchorVariant` (the clicked element's own `data-value`, resolved
 * client-side) if no exact combo exists - "snapping" the other option(s)
 * to whatever that fallback variant actually has, same as a typical
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
 * `data-variant-js-bound` so re-running `initVariantPickers` (e.g. after
 * client/ver_2_0/js/collection.js's `loadNextPage` appends more cards)
 * never double-binds a card already initialized.
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
