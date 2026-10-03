"use strict";

// The `[dynamic="*"]`/active-swatch/selected-size/disabled-state side of
// variant switching for snippets/5dla_product-card-3.liquid - everything
// that reads or writes a card's DOM state for a given variant. Kept
// separate from client/ver_2_0/js/modules/variant.js's click-handling/
// variant-resolution logic so `applyVariant` there can stay a thin
// orchestrator over these.

export const COLOR_OPTION_SELECTOR = ".store-color-option[data-value]";
export const SIZE_OPTION_SELECTOR = ".size-option[data-value]";

/**
 * @param {object} variant
 * @param {number} position
 * @returns {string|null}
 */
export const variantOptionValue = (variant, position) => variant[`option${position}`] ?? null;

/**
 * Resizes a Shopify CDN image URL via its `width` query param - the same
 * transform `image_url: width: 960` applies server-side (see
 * snippets/5dla_product-card-3.liquid), ported here for `updateProductImage`'s
 * client-side swap on color change.
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
 * Ports assets/currencies.js's own `Currency.formatMoney` placeholder/
 * delimiter logic (not reusable as-is - see `formatMoney` below for why).
 * Kept as a near-literal copy so this stays in sync with that file's
 * behavior (same `{{amount*}}` placeholder names, same default
 * thousands/decimal separators) without actually depending on it loading.
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
 * (`wpbingo.strings.moneyFormat`, from `shop.money_format` - set
 * unconditionally in snippets/header-javascript.liquid, so always
 * available). Prefers `Currency.formatMoney` (assets/currencies.js) when
 * it happens to be loaded, for consistency with any currency-conversion
 * state it tracks - but that script is ONLY included when
 * `settings.show_currency_selector and settings.currency_type == '2'`
 * (snippets/footer-javascript-optimized.liquid), so most stores never
 * load it. The previous fallback here (`$${(cents/100).toFixed(2)}`)
 * ignored `moneyFormat` entirely, which is why a locale price like
 * "HK$3,850.00" (rendered server-side via Liquid's `money` filter) turned
 * into plain "$3850.00" after a client-side variant change - this fallback
 * instead runs the real format template, so it stays correct either way.
 * @param {number} cents
 */
const formatMoney = cents => {
  const format = window.wpbingo?.strings?.moneyFormat;
  if (window.Currency?.formatMoney) {
    return window.Currency.formatMoney(cents, format);
  }
  return formatMoneyFallback(cents, format);
};

/**
 * Reads the card's current selection (every option position -> value)
 * from `data-current-variant-id` (seeded server-side to
 * product.selected_or_first_available_variant.id in
 * snippets/5dla_product-card-3.liquid, then kept live by `applyVariant` in
 * client/ver_2_0/js/modules/variant.js).
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
 * product.title doesn't actually vary by variant - re-set anyway so every
 * `[dynamic]` field goes through the same "refresh on variant change"
 * routine (see snippets/5dla_product-card-3.liquid's comment).
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
  if (imageEl && image) {
    imageEl.src = resizeImage(image.src, 960);
    imageEl.alt = image.alt || product.title;
  }
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
 * Re-checks every color swatch's/size button's availability against the
 * FULL current `selected` state (every position, not just ones preceding
 * it in product.options order) - this is what makes disabling
 * bidirectional (picking a color can disable sizes, AND picking a size
 * can disable colors), unlike the page-load-only computation in
 * snippets/5dla_product-card-3-swatches.liquid/
 * snippets/5dla_product-size-selector.liquid, which only looks at EARLIER
 * option positions (correct there, since later selections aren't known
 * yet on first render; not correct here, where every position already
 * has a concrete, live value).
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
