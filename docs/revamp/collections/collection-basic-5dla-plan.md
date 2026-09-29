# Collection Page Revamp — `collection.c5dla.basic`

**Status as of this doc**: all 7 sections exist and render on the live template. Markup/CSS for 5 of them is a 1:1 port of the reference HTML (`html/revamp-collection/rendered/Fusion Cycling Jerseys....html`); 2 real features are wired up with actual JS (colour toggle, load-more/infinite-scroll pagination); everything else (filter/sort drawer, gender pills, sub-collection pills, quick view/compare/wishlist) is HTML/CSS only, intentionally inert for now. This doc was rewritten from scratch against the current repo state - earlier revisions of this doc described an architecture (Bootstrap-heavy facet drawer, blocks-based content, a separate `2_0-theme.liquid` layout, a `global.js` header/footer port) that was built, then explicitly torn back out. Don't trust anything from before this rewrite.

Scope: the collection page body only. `<header>`/`<footer>` are out of scope and untouched - they stay on the legacy jQuery/wpbingo.js/Bootstrap 4 stack.

## 1. Architecture (current, actual)

- **Layout**: `layout/theme.liquid` (the theme's normal, legacy layout - **not** a separate file). Its only edit for this project is one conditional class:
  ```liquid
  <main class="main-content{% if template.suffix contains 'c5dla' %} c5dla-scope{% endif %}" role="main">
  ```
  `.c5dla-scope` is the sole hook the new stack's CSS is scoped under.
- **Template**: `templates/collection.c5dla.basic.json` - no `"layout"` key (uses the default `layout/theme.liquid`). Lists the 7 sections in `order`.
- **Header/footer stay 100% legacy** - jQuery, `assets/wpbingo.js`, Bootstrap 4 (`assets/bootstrap.min.css` via `client/js/style.js`) untouched. Two small **additive** conditional includes make the new bundle load, both gated by `template.suffix contains 'c5dla'`:
  - `snippets/header-styles.liquid` (~L115): `{{ 'bundled.collection.2.0.css' | asset_url | stylesheet_tag }}`
  - `snippets/footer-javascript-optimized.liquid` (end of file, also gated by `page_type contains 'collection'`): `<script src="{{ 'bundled.collection.2.0.js' | asset_url }}" defer="defer"></script>`
- **Build**: `scripts/vite-build.mjs` builds two families of entries:
  - `client/js/*.js` → `assets/bundled.<name>.js` (legacy, unchanged).
  - `client/ver_2_0/js/*.js` → `assets/bundled.<name>.2.0.js`/`.2.0.css` (new stack). Currently **only one entry exists**: `client/ver_2_0/js/collection.js`.
  - ver_2_0 CSS is scoped via `postcss-prefix-selector`: every selector gets `.c5dla-scope` prepended. `:root`/`html`/`body` (bare or as the *leading* part of a compound selector, e.g. `body.show-all-colours .foo`) are special-cased to become `.c5dla-scope` itself rather than a descendant - see the `transform()` function's comment for why (`.c5dla-scope` lives on `<main>`, a descendant of `<body>`, so a state class toggled on `<body>` would never match a plain descendant selector; it has to be toggled on `.c5dla-scope` itself instead - see §5).
  - `package.json` has `bootstrap` (^5.3.8) and `postcss-prefix-selector` (^2.2.1) as the only new deps this revamp needed.
- **SCSS**: `client/ver_2_0/scss/`
  - `_shared-variables.scss` - Bootstrap variable overrides ($primary, $font-family-*, border-radius: 0, etc.), reusing the theme's existing `--font-family-base`-style CSS custom properties.
  - `collection/collection.scss` - the entry point. Imports `_shared-variables`, then the **full** `bootstrap/scss/bootstrap` (needed for `.btn` styling used by the load-more button), then each section partial (`_breadcrumb`, `_banner`, `_subcollections`, `_filter-sort`, `_product-grid`, `_benefits`). **No `_content-slots.scss` exists** - that section has no fixed markup to style (see §4.6).
  - Comments in a few files (`collection.scss`, `_shared-variables.scss`, `vite-build.mjs`) still mention a `global/global.scss` or `client/ver_2_0/js/global.js` - **those don't exist**. They were built during an earlier pass (a full header/footer JS/CSS port) that was reverted; the stale comments weren't fully cleaned up. Don't go looking for those files.
- **JS**: `client/ver_2_0/js/collection.js` is the **only** JS file in the new stack (no `modules/` subfolder). See §5 for what it does.

## 2. Section map

| Order | Section file | Schema settings | Blocks |
|---|---|---|---|
| 1 | `sections/5dla_collection-breadcrumb.liquid` | `enable`, `home_label`, `show_current`, `separator` | none |
| 2 | `sections/5dla_collection-banner.liquid` | `enable` only | none (activity links are raw hardcoded HTML) |
| 3 | `sections/5dla_collection-subcollections.liquid` | `enable` only | none (category pills are raw hardcoded HTML) |
| 4 | `sections/5dla_collection-filter-sort.liquid` | `enable` only | none |
| 5 | `sections/5dla_collection-product-grid.liquid` | `swatch_limit`, `page_item`, `pagination_style` (`loadmore`/`infinite`) | none |
| 6 | `sections/5dla_collection-content-slots.liquid` | none (no settings at all) | none |
| 7 | `sections/5dla_collection-benefits.liquid` | none (no settings at all) | none |

Plus supporting snippets: `snippets/5dla_product-card.liquid`, `snippets/5dla_product-card-actions.liquid`, `snippets/5dla_product-swatch.liquid`.

**Naming note**: sections use the `5dla_` file prefix and `"5DLA <Name>"` schema names, kept short (≤25 chars) after hitting Shopify's `ValidSchemaName` limit early on (e.g. `"5DLA Breadcrumb"`, not `"5DLA Collection Breadcrumb"`).

### 4.1 Breadcrumb
Plain `<p class="c5dla-breadcrumb">Home / {{ collection.title }}</p>`, ported 1:1 from the reference's `p.breadcrumb`. Also carries the reference `.intro` wrapper's *top* padding/centering (`max-width:1600px; margin:0 auto`), since this section renders where that wrapper's first child used to sit - see §4.2 for how the rest of that shared padding is distributed.

### 4.2 Collection banner
`h1` = `collection.title`. Lead content = `collection.description` rendered as-is inside `<div class="five-lead">` - **this is the real mechanism for both the lead paragraph text AND an optional background image**: if the merchant's collection description starts with an `<img>` (e.g. `<p><img src="..."></p><p><span>lead text</span></p>`), that `<img>` gets detected server-side (`collection.description contains '<img'`) and the section gets a `has-banner-img` class. CSS then:
- Positions any `img` inside `.five-lead` as `position:absolute; z-index:0; max-height:326px; width:100%; object-fit:cover`.
- Gives every `p` inside `.five-lead` `position:relative; z-index:1` so the actual text paints *above* the image (a plain non-positioned `<p>` would otherwise paint before a z-index:0 absolutely-positioned sibling - needed the explicit stacking).
- `.has-banner-img { min-height: 326px; }` so the section doesn't collapse shorter than the image.

No `image_picker` setting exists - this was deliberately removed in favor of the description-embedded-image approach. Activity links (`nav.five-activity-links`) are 5 hardcoded `<a>` tags (Cycling jerseys / Bib shorts / Road race suits / Triathlon / Running), not blocks - ported verbatim from the reference, hrefs pointed at this store's own routes (`routes.search_url`, `collection.url`, `routes.collections_url`).

### 4.3 Sub-collections
`nav.categories` - 6 hardcoded `<button>` elements ("All {collection.title}", Jerseys, Bib shorts, Race suits, Accessories, Base layers), matching the reference exactly. **Inert** - no click behavior, purely decorative pills right now (see §6).

### 4.4 Filter & sort
`div.filters` ported 1:1: the "Filter & sorting" button (SVG icon + text, inert), `.genders` pill row (All genders/Men/Women/Unisex, inert), and `.colors-toggle` checkbox (**wired up**, see §5). All the original facet-form/offcanvas-drawer/active-facet-chips machinery from an earlier pass was deliberately removed - this section is raw HTML now, no `<form>` at all.

### 4.5 Product grid
Fixed 4/3/2 column CSS grid (desktop/tablet/mobile - not merchant-configurable, no column settings exist). Renders `collection.products` via `snippets/5dla_product-card.liquid`. Empty state ported from the reference's `.empty-products` (message + a "clear filters" link back to `collection.url`).

Pagination: `pagination_style` is `loadmore` or `infinite` (the old `pagination`/prev-next-links option was replaced with `infinite`). Both share one markup shape:
```liquid
<div class="c5dla-loadmore" data-c5dla-pagination data-section-id="{{ section.id }}" data-next-url="{{ paginate.next.url }}" data-pagination-style="{{ section.settings.pagination_style }}">
  {%- if loadmore -%}<button data-c5dla-loadmore>...</button>
  {%- else -%}<div class="c5dla-loadmore__spinner" data-c5dla-infinite-sentinel></div>{%- endif -%}
</div>
```
Real, working JS behind both - see §5.

### 4.6 Content slots
**Not ported from the reference at all** - this section renders `collection.metafields.bwp_fields.seo_contents.value` (a list-of-pages metafield), one page per `<div class="page-{{ page.handle }}">{{ page.content }}</div>`. No settings, no blocks, no fixed CSS (each page's rich-text content is arbitrary admin-authored HTML/CSS - see §7).

### 4.7 Benefits
`section.collection-benefits` ported 1:1 - 3 hardcoded links (Free shipping / Free returns / Crash replacement), pointing at `pages['shipping-delivery']`/`pages['return-exchange']`/`pages['crash-damage-replacement']` (with literal `/pages/...` fallbacks if those pages don't exist yet). No settings, no blocks.

### Product card (`snippets/5dla_product-card.liquid`)
`article.product` ported 1:1: badge (from `product.metafields.custom.badge_text`, falling back to sold-out/sale-price text), image, title+price, short description (`product.metafields.custom.short_description` → `product.description` fallback, truncated), and color swatches.

Structural note: the image link (`a.product-image`) and the hover action buttons are **siblings** inside a new `.product-media` wrapper, not nested (interactive buttons/forms can't legally sit inside another interactive element like an anchor) - `.product-media` is the positioning context instead of `.product-image` itself.

**Swatches** (`snippets/5dla_product-swatch.liquid`) port real logic from the legacy `snippets/product-grid-hover-9.liquid` (L422-517):
- `active` - first swatch value gets `.active`.
- `safe_value` - value sanitized for use as a CSS class (spaces/slashes → dashes).
- `option_disabled` - a value is enabled only if some *available* variant carries it at this option's position **and** matches `current_variant` on every option position before it (cascading availability, e.g. a Size is only enabled for the currently-selected Color). Generalized from the legacy's hardcoded `option_index == 1/2/3` branches to a computed `optionN` key based on `color_option.position` (Color isn't guaranteed to be the product's first option).
- Swatch color itself: no inline `background-color`. Reuses `.wpb-variants-swatch` + the raw/sanitized value as CSS classes, which `sections/customer-variant.liquid` (**not touched**) already generates matching `.wpb-variants-swatch .Black{...}` CSS for.
- **All** color values are always rendered (not `limit:`ed) - ones past `swatch_limit` get `swatch--extra` (hidden by default, revealed by the colours toggle - see §5).

### Product card actions (`snippets/5dla_product-card-actions.liquid`)
The 4 hover buttons ported from `product-grid-hover-9.liquid` L121-222, ordinal **quick view → compare → wishlist → add to cart**, stacked top-to-bottom via flexbox in the same bottom-right corner the reference's single `.quick-add` icon occupied. Quantity stepper intentionally not ported.
- Quick view/compare/wishlist: HTML/CSS only, **inert**. Class/data-attribute hooks kept identical to legacy (`js-btn-quickview`, `button-compare`, `button-wishlist`, `data-product-handle`) so legacy or new JS can bind later.
- Add to cart: only 2 states - sold out (disabled), or a real `<form action="{{ routes.cart_add_url }}" class="form-addtocart" data-product-form>`. **This form already works** - it reuses the exact legacy hooks (`.form-addtocart`/`data-product-form`) that `assets/wpbingo.js`'s global `formOverride` handler (bound on `<body>`, delegated via `settings.formSelector`) already intercepts, so clicking it does a real `/cart/add.js` AJAX call via legacy JS. No "view product" fallback for multi-variant products (dropped, out of scope).
- Icons are inline SVG (not the legacy icon font, unavailable in this stack); visible labels are `.visually-hidden` (a free Bootstrap 5 utility).
- **`.is-adding` spinner fix**: `assets/wpbingo.js`'s `formOverride` doesn't just toggle `.is-adding` on submit - it also *prepends a real* `<span class="spinner-border spinner-border-sm">` into the button. That collided with this stack's own `::before`-based spinner (both rendering at once). Fix (in `_product-grid.scss`, `.product-card-actions__item .btn.is-adding`): hide the SVG icon (`visibility:hidden`, not `display:none`, to keep layout), hide the legacy-injected `.spinner-border` (`display:none`), and show a ported `::before` ring spinner (`@keyframes c5dla-spin-load`, matching `assets/css-site-main.css`'s own `.product-card__buttons .btn.is-adding:before`, ~L3645).

## 5. JS (`client/ver_2_0/js/collection.js`) - everything that's actually wired up

Three behaviors, no `modules/` subfolder (deliberately flat, single file, per how this was asked for):

1. **Colours toggle** - `[data-c5dla-colors-toggle]` (the checkbox in §4.4) toggles `.show-all-colours` on `document.querySelector('.c5dla-scope')` (**not** `document.body` - see §1's scoping note for why). CSS reveals `.swatch--extra` and hides `.color-count` while that class is present. One page-wide toggle affecting every card at once, matching the reference's own client-side `slice(0, allColours ? void 0 : 4)` behavior.
2. **Load more / infinite scroll** - one shared `loadNextPage(pagination)` function: fetches `data-next-url` via the Section Rendering API (`?sections=<data-section-id>`), appends the response's `.products` children into the current `.products` grid, and either updates `data-next-url` in place (same DOM node persists) or removes the whole `[data-c5dla-pagination]` container once there's no next page.
   - Load-more button: plain delegated click listener on `[data-c5dla-loadmore]`.
   - Infinite scroll: `IntersectionObserver` on `[data-c5dla-infinite-sentinel]` (`rootMargin: "800px 0px"`) - ports `assets/wpbingo.js`'s `ajaxFilterInfinity` (a scroll-position check + busy flag) without a raw scroll listener or jQuery.
   - On fetch failure, falls back to a real `window.location.assign(nextUrl)` navigation.
3. Nothing else has JS. Quick view/compare/wishlist/filter-drawer/gender-pills/sub-collection-pills are all still inert (§6).

## 6. Known gaps - inert by design, not bugs

These render correctly but do nothing yet:
- "Filter & sorting" button (no drawer exists to open).
- Gender pills (Men/Women/Unisex) in the toolbar.
- Sub-collection pills (Jerseys/Bib shorts/etc.) - text-only buttons, no `href`, no click handler.
- Quick view button.
- Compare button.
- Wishlist button.

Add to cart **does** work (see §4's product-card-actions section) because it deliberately reuses legacy AJAX hooks.

## 7. Content slots: the `html/pages/collection-slot-*.html` files

Three standalone HTML fragments exist in `html/pages/` (no `<html>`/`<head>`/`<body>` - meant to be pasted directly into a Shopify Page's HTML editor):
- `collection-slot-editorial.html` - the reference's `section.editorial` (full-bleed image + heading + CTA).
- `collection-slot-promises.html` - the reference's `section.promises` (3-column "01/02/03" trust points).
- `collection-slot-seo-guide.html` - the reference's `section.five-seo-section` in full (buying guide + FAQ accordion + related-links nav, all originally nested in one wrapper in the reference).

All classes renamed to a `c5dla-*` convention (e.g. `c5dla-editorial__heading`, `c5dla-seo-guide__faq-item`) with CSS inline in a `<style>` tag in each file (namespacing is the isolation mechanism here, not the `.c5dla-scope` build-time scoping - these are pasted into arbitrary Shopify Pages, not part of the Vite bundle).

**To use them**: create 3 Shopify Pages, paste each fragment as that page's content, then set the collection's `bwp_fields.seo_contents` metafield to reference those pages (list-of-pages type) - `5dla_collection-content-slots.liquid` (§4.6) will render whichever pages are linked, in order.

## 8. Verification

```bash
node scripts/vite-build.mjs --mode production   # builds assets/bundled.collection.2.0.{js,css} (and all legacy entries)
npx shopify theme check --output json           # should be 0 errors on every 5dla_*/collection.c5dla.basic file
```

## 9. Open items for a future session

1. Wire up quick view / compare / wishlist (§6) - class hooks already exist, just need real JS + (for compare/wishlist) some persistence mechanism (localStorage, matching legacy's client-side approach, or a real Shopify feature).
2. Wire up the gender pills and "Filter & sorting" drawer - currently no drawer markup exists at all (removed in an earlier pass); would need new markup + a real facet-filtering JS module (the collection-filters.js approach from an earlier, since-reverted pass may be worth revisiting, ported from Shopify's native `collection.filters`).
3. Wire up sub-collection pills - decide whether they should navigate to real sub-collections (need a `collection_list`/data source again) or filter by a tag/metafield.
4. Confirm `bwp_fields.seo_contents` is the correct/final metafield definition (namespace+key) for content slots, and that the 3 `html/pages/collection-slot-*.html` fragments have actually been pasted into real Shopify Pages and linked.
5. Clean up stale comments referencing the since-deleted `global.js`/`global/global.scss`/`2_0-header-*.liquid`/`2_0-theme.liquid` (harmless, but confusing) in `collection.scss`, `_shared-variables.scss`, and `vite-build.mjs`.
