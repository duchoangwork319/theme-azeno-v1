"use strict";

// The `[dynamic="*"]`/active-swatch/selected-size/disabled-state side of
// variant switching for snippets/5dla_product-card-3.liquid. Kept
// separate from ./variant.js's click-handling so `applyVariant` there can
// stay a thin orchestrator over these.

export const COLOR_OPTION_SELECTOR = ".store-color-option[data-value]";
export const SIZE_OPTION_SELECTOR = ".size-option[data-value]";

/**
 * @param {object} variant
 * @param {number} position
 * @returns {string|null}
 */
export const variantOptionValue = (variant, position) => variant[`option${position}`] ?? null;

/**
 * Resizes a Shopify CDN image URL via its `width` query param - same
 * transform `image_url: width: 960` applies server-side, ported here for
 * `updateProductImage`'s client-side swap.
 * @param {string} src
 * @param {number} width
 */
const resizeImage = (src, width) => {
  if (!src) return src;
  const url = new URL(src, window.location.origin);
  url.searchParams.set("width", String(width));
  return url.toString();
};

/**
 * Ports assets/currencies.js's `Currency.formatMoney` placeholder/delimiter
 * logic as a near-literal copy, so this stays in sync with its behavior
 * without depending on that script actually loading.
 * @param {number} cents
 * @param {string} format - a `shop.money_format`-style template, e.g.
 *   `HK${{amount_with_comma_separator}}`
 */
const formatMoneyFallback = (cents, format) => {
  const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  const formatString = format || "${{amount}}";

  const formatWithDelimiters = (number, precision = 2, thousands = ",", decimal = ".") => {
    if (Number.isNaN(number) || number == null) return "0";
    const parts = (number / 100).toFixed(precision).split(".");
    const dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, `$1${thousands}`);
    const cents_ = parts[1] ? decimal + parts[1] : "";
    return dollars + cents_;
  };

  const match = formatString.match(placeholderRegex);
  let value = "";
  switch (match && match[1]) {
    case "amount":
      value = formatWithDelimiters(cents, 2);
      break;
    case "amount_no_decimals":
      value = formatWithDelimiters(cents, 0);
      break;
    case "amount_with_space_separator":
      value = formatWithDelimiters(cents, 2, " ", ".");
      break;
    case "amount_no_decimals_with_comma_separator":
      value = formatWithDelimiters(cents, 0, ",", ".");
      break;
    case "amount_no_decimals_with_space_separator":
      value = formatWithDelimiters(cents, 0, " ");
      break;
    case "amount_with_comma_separator":
      value = formatWithDelimiters(cents, 2, ".", ",");
      break;
    default:
      value = formatWithDelimiters(cents, 2);
  }

  return formatString.replace(placeholderRegex, value);
};

/**
 * Formats a price (cents) via the sitewide money format
 * (`wpbingo.strings.moneyFormat`, always available). Prefers
 * `Currency.formatMoney` when loaded - but that script only loads when
 * `settings.show_currency_selector and currency_type == '2'`, so most
 * stores never get it; the fallback here runs the real format template
 * (not a naive `$X.XX`, which ignored locale formats like "HK$"), so
 * prices stay correct either way. Exported so quick-view.js can reuse it.
 * @param {number} cents
 */
export const formatMoney = cents => {
  const format = window.wpbingo?.strings?.moneyFormat;
  if (window.Currency?.formatMoney) {
    return window.Currency.formatMoney(cents, format);
  }
  return formatMoneyFallback(cents, format);
};

/**
 * Reads the card's current selection from `data-current-variant-id`
 * (seeded server-side, kept live by ./variant.js's `applyVariant`).
 * @param {Element} card
 * @param {object} product
 * @returns {Record<number, string>}
 */
export const readSelectedState = (card, product) => {
  const currentVariantId = card.dataset.currentVariantId;
  const variant = product.variants.find(v => String(v.id) === currentVariantId) || product.variants[0];
  const selected = {};
  product.options.forEach((_name, index) => {
    const position = index + 1;
    selected[position] = variantOptionValue(variant, position);
  });
  return selected;
};

/**
 * product.title doesn't vary by variant - re-set anyway so every
 * `[dynamic]` field goes through the same refresh routine.
 * @param {Element} card
 * @param {object} product
 */
export const updateProductTitle = (card, product) => {
  const titleEl = card.querySelector("[dynamic=\"product-title\"]");
  if (titleEl) titleEl.textContent = product.title;
};

/**
 * @param {Element} card
 * @param {object} variant
 */
export const updateProductPrice = (card, variant) => {
  const priceEl = card.querySelector("[dynamic=\"product-price\"]");
  if (priceEl) priceEl.textContent = formatMoney(variant.price);
};

/**
 * Caller is responsible for only invoking this when the COLOR actually
 * changed (per request) - a plain size change should never touch the
 * image.
 * @param {Element} card
 * @param {object} product
 * @param {object} variant
 */
export const updateProductImage = (card, product, variant) => {
  const image = variant.featured_image;
  const imageEl = card.querySelector("[dynamic=\"product-image\"]");
  if (!imageEl || !image) return;

  const resized = resizeImage(image.src, 960);
  // If this image is still deferred (lazyload.js hasn't scrolled it into
  // view - `data-src`, no real `src`), update THAT instead of forcing a
  // real `src`: the card may be below the fold (e.g. "Show all colours"
  // clicked on an off-screen card), so forcing a load now would defeat
  // the point of deferring it - whichever color is selected by the time
  // it scrolls into view is what loads.
  if (imageEl.dataset.src) {
    imageEl.dataset.src = resized;
  } else {
    imageEl.src = resized;
  }
  imageEl.alt = image.alt || product.title;
};

/**
 * @param {Element} card
 * @param {object} variant
 */
export const updateQuickViewTrigger = (card, variant) => {
  const quickViewEl = card.querySelector("[dynamic=\"quick-view-trigger\"]");
  if (quickViewEl) quickViewEl.dataset.variantId = variant.id;
};

/**
 * @param {Element} card
 * @param {object} variant
 */
export const updateVariantIdInput = (card, variant) => {
  const variantInputEl = card.querySelector("[dynamic=\"variant-id-input\"]");
  if (variantInputEl) variantInputEl.value = variant.id;
};

/**
 * @param {Element} card
 * @param {object} variant
 */
export const updateAddToCartButton = (card, variant) => {
  const addToCartEl = card.querySelector("[dynamic=\"add-to-cart-button\"]");
  if (addToCartEl) addToCartEl.disabled = !variant.available;
};

/**
 * Activates the color swatch matching `selected[colorPosition]`,
 * deactivating every other one.
 * @param {Element} card
 * @param {Record<number, string>} selected
 * @param {number|null} colorPosition
 */
export const updateActiveColorOption = (card, selected, colorPosition) => {
  card.querySelectorAll(COLOR_OPTION_SELECTOR).forEach(el => {
    el.classList.toggle("active", colorPosition != null && el.dataset.value === selected[colorPosition]);
  });
};

/**
 * Selects the size button matching `selected[sizePosition]`, deselecting
 * every other one (`.selected` + `aria-pressed`).
 * @param {Element} card
 * @param {Record<number, string>} selected
 * @param {number|null} sizePosition
 */
export const updateSelectedSizeOption = (card, selected, sizePosition) => {
  card.querySelectorAll(SIZE_OPTION_SELECTOR).forEach(el => {
    const isSelected = sizePosition != null && el.dataset.value === selected[sizePosition];
    el.classList.toggle("selected", isSelected);
    el.setAttribute("aria-pressed", String(isSelected));
  });
};

/**
 * Re-checks every swatch/size button's availability against the FULL
 * current selection (not just earlier positions, unlike the page-load-only
 * Liquid computation) - this is what makes disabling bidirectional
 * (picking a color can disable sizes and vice versa).
 * @param {Element} card
 * @param {object} product
 * @param {Record<number, string>} selected
 */
export const refreshDisabledStates = (card, product, selected) => {
  [
    { selector: COLOR_OPTION_SELECTOR, position: card.dataset.colorPosition },
    { selector: SIZE_OPTION_SELECTOR, position: card.dataset.sizePosition },
  ].forEach(({ selector, position }) => {
    if (!position) return;
    const thisPosition = Number(position);

    card.querySelectorAll(selector).forEach(el => {
      const value = el.dataset.value;
      const isAvailable = product.variants.some(variant => {
        if (!variant.available || variantOptionValue(variant, thisPosition) !== value) return false;
        return Object.entries(selected).every(([otherPosition, otherValue]) => {
          if (Number(otherPosition) === thisPosition) return true;
          return variantOptionValue(variant, Number(otherPosition)) === otherValue;
        });
      });

      el.classList.toggle("disabled", !isAvailable);
      if (el.matches("button")) el.disabled = !isAvailable;
    });
  });
};
