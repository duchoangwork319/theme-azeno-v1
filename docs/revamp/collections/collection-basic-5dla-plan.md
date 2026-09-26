# Collection Page Revamp — `collection.basic.5dla`

Scope: the collection page body only (`<header>`/`<footer>` excluded — separate revamp). Reference source: `html/revamp-collection/5DLA_Cycling_Collection_Final.html`, a Chrome "save as complete webpage" capture of the **live, hydrated** 5dla.com collection page, cross-checked against `html/revamp-collection/rendered/*.html` for Men's/Women's collections.

## 1. Build infrastructure check

| Item | Status | Notes |
|---|---|---|
| SCSS compilation | Already supported by the underlying tooling | `sass` and `sass-embedded` are already in `devDependencies`. Vite natively transforms any `.scss`/`.sass` imported from a JS entry (proven today — `client/js/style.js` already imports `assets/css-header-fs-megamenu.scss` alongside plain `.css`). |
| `package.json` | **One addition needed** | Add `bootstrap` (v5) to `dependencies`/`devDependencies` so it can be `@import`ed into the new SCSS entry and its JS components (`bootstrap`'s bundle, or just the individual ES modules we need — Offcanvas, Collapse/Accordion, Dropdown) can be imported into the new JS entry. No other new packages required to start; add more only if a specific interaction genuinely needs one (see §3). |
| `vite-build.mjs` | **Change needed** | `listJSFiles()` currently scans only the top level of `client/js/*.js`. It needs to also discover entries under the new `client/ver_2_0/js/` folder (see §2) so those get built the same way — as their own self-contained Vite entry/bundle. Simplest change: extend `listJSFiles()` to additionally `readdirSync(client/ver_2_0/js)` (top-level files only, same rule as today) and merge those into the `entries` array before the build loop runs; entry `name` stays the file's basename, so output files land at `assets/bundled.<name>.js`/`.css` exactly like existing entries. No change needed to the per-entry `config` (outDir, base, minify, etc.) — the new entries reuse it as-is. |

**Convention to follow:** SCSS files themselves are never built directly — a `.scss` file only compiles if a JS entry file `import`s it (same as the existing `style.js` pattern). This is why the plan below adds one new top-level JS entry (under `client/ver_2_0/js/`) rather than expecting `client/ver_2_0/scss` to build on its own.

## 2. File & naming conventions for this revamp

| Item | Convention |
|---|---|
| Section files | `sections/5dla_<name>.liquid` |
| Section `schema.name` / `presets[].name` | Prefixed `"5DLA <Name>"` |
| Template | `templates/collection.basic.5dla.json` |
| New SCSS | `client/ver_2_0/scss/` (partials, including a `bootstrap` import/override partial) + one entry point. No `5dla` prefix — the `ver_2_0` folder itself scopes these as the new-stack resources. |
| New JS | `client/ver_2_0/js/collection.js` (new top-level entry — picked up by the `vite-build.mjs` change above, imports the SCSS entry + Bootstrap 5 JS) + `client/ver_2_0/js/modules/` subfolder for behavior modules (filter engine, drawer, accordion, etc.). No `5dla` prefix, same reasoning. |
| Legacy JS | `client/js/*` existing files (`main.js`, `product.js`, `head-collection.js`, `style.js`, …) are **not modified**. `assets/wpbingo.js` and jQuery are **not loaded at all** on this template — see §3. |

Output bundle: `assets/bundled.collection.js` + `assets/bundled.collection.css` (from the `client/ver_2_0/js/collection.js` entry, per the `vite-build.mjs` change in §1). These need one small **additive** (not modifying existing logic) conditional include in `snippets/header-styles.liquid` and `snippets/footer-javascript-optimized.liquid`, gated by `template.suffix == 'basic.5dla'`, mirroring the existing `page_type`/`bundled.product.css` pattern. On this gate, the legacy `bundled.wpbingo.min.js` / `bundled.global.min.js` script tags should be **skipped** for this template (not just left unused) — legacy `collection.liquid` pages keep loading them unchanged, only `collection.basic.5dla.json` opts out.

## 3. JS architecture decision (important)

**`assets/wpbingo.js` (and any other legacy jQuery-era script/package) will not be used anywhere on this template.** It's old, jQuery-dependent, and a known performance liability (render-blocking size, layout thrash from its DOM-heavy plugin init pattern) — carrying it into a from-scratch page type would just import the same problem into the new design.

**Stack for this revamp:** Bootstrap 5 (CSS via SCSS `@import`, JS via its native ES modules — no jQuery dependency, Bootstrap 5 dropped it) + vanilla JS for everything else. Bootstrap components map cleanly onto the reference UI: `Offcanvas` for the filter/sort drawer, `Collapse`/`Accordion` for the FAQ, `Dropdown` for the sort control, standard grid/utility classes for the layout instead of hand-rolled flex/grid CSS. Additional modern packages (e.g. a small swatch/color-picker helper, a lightweight carousel if the "tiles" sub-collection style needs one) can be added individually if a specific interaction genuinely warrants it — default to vanilla JS or a Bootstrap component first.

**Filtering/sorting engine:** the current theme's filtering is built on Shopify's **native facet/filter engine** (`collection.filters`, `results.filters`, driven by real URL params and Section Rendering API AJAX) — that server-side facet model is sound and is kept. What changes is the JS implementation: instead of reusing `wpbingo.js`'s jQuery AJAX layer, we **port the same native-facet approach to a new vanilla JS module** (`client/ver_2_0/js/modules/collection-filters.js`):
- Renders/reads Shopify's real `collection.filters` data (same URL params, same server-side pagination) — no in-memory/client-only filtering.
- On filter/sort change, fetches updated markup via the Section Rendering API (`?section_id=`) using `fetch()`, swaps the DOM, updates the URL via `history.pushState` — the same technique `wpbingo.js` uses today, rewritten without jQuery and scoped only to this template.
- Drives the Bootstrap `Offcanvas` drawer and `Accordion`/`Dropdown` UI pieces described above.
- Lives entirely under `client/ver_2_0/js/`, independent of `wpbingo.js`, so nothing here can regress the legacy template.

## 4. Section breakdown

### 4.1 Breadcrumb — `5dla_collection-breadcrumb.liquid`

Reference DOM is a plain text trail embedded at the top of the hero (`Home / Cycling`), not an image-backed bar like the current `collection-breadcrumb.liquid`.

| Setting id | Type | Label | Default | UX purpose |
|---|---|---|---|---|
| `enable` | checkbox | Enable | `true` | Toggle whole section |
| `home_label` | text | Home label | `Home` | Localizable without editing theme code |
| `show_current` | checkbox | Show current collection | `true` | Hide on collections where title is redundant with hero |
| `separator` | text | Separator character | `/` | Small branding control |
| `color_text` | color | Text color | `#6b6b6b` | Match banner background |
| `color_link` | color | Link color | `#111111` | Contrast control |
| `text_transform` | select (`none`/`uppercase`) | Text case | `none` | Match hero typography style |

### 4.2 Collection banner (hero) — `5dla_collection-banner.liquid`

Reference is **text-only**: H1 + lead paragraph + inline cross-links to sibling activities (`Road race suits`, `Triathlon`, `Running`) — no image/video hero, unlike the current `collection-banner.liquid`. Recommend supporting an *optional* background image so merchants can opt into imagery per-collection without forcing it.

| Setting id | Type | Label | Default | UX purpose |
|---|---|---|---|---|
| `enable` | checkbox | Enable | `true` | |
| `heading` | text | Heading | Collection title (fallback via Liquid if blank) | Lets merchant override `collection.title` for SEO-optimized H1 |
| `lead_text` | richtext | Lead paragraph | — | Editorial intro copy, matches `.five-lead` |
| `image` | image_picker | Background image (optional) | — | Blank = text-only layout, matching reference |
| `image_overlay_opacity` | range (0–100) | Overlay opacity | `0` | Only relevant when image set; protects text contrast |
| `text_align` | select (`left`/`center`) | Text alignment | `left` | Matches reference (left-aligned) vs. legacy centered banners |
| `min_height` | text | Minimum height | `auto` | Reference is content-height, not a fixed hero height |

**Blocks** — `activity_link` (repeatable, replaces a fixed link_list so labels can diverge from collection titles):

| Setting id | Type | Label | Default |
|---|---|---|---|
| `label` | text | Link label | `Shop now` |
| `url` | url | Link URL | — |

### 4.3 Sub collections — `5dla_collection-subcollections.liquid`

Reference implements this as a horizontally-scrollable **pill/tab nav** (`All cycling / Jerseys / Bib shorts / Race suits / Accessories / Base layers`), not the image-tile carousel the current `collection-feature.liquid` renders. Recommend a `display_style` switch so both patterns are available theme-wide.

| Setting id | Type | Label | Default | UX purpose |
|---|---|---|---|---|
| `enable` | checkbox | Enable | `true` | |
| `display_style` | select (`pills`/`tiles`) | Display style | `pills` | `pills` = reference behavior; `tiles` = reuse existing image-carousel pattern for collections that want imagery |
| `collections` | collection_list | Sub-collections | — | Merchant picks actual collection resources (auto pulls title/image/handle), simpler than maintaining a separate menu |
| `show_all_option` | checkbox | Show "All" pill | `true` | Matches `All cycling` first pill in reference |
| `sticky` | checkbox | Stick to top on scroll | `false` | Useful once combined with the filter toolbar below |
| `columns_desktop` / `columns_mobile` | range | Tiles per row (tiles mode only) | `4` / `2` | Only relevant in `tiles` mode |

### 4.4 Filtering and sorting — `5dla_collection-filter-sort.liquid`

Toolbar only (product grid is its own section, §4.5 — split out so either can be toggled/reordered independently, e.g. a future landing-style collection could keep the toolbar without the default grid layout, or vice versa). Reference toolbar: gender pills (`All genders / Men / Women / Unisex`), a "show all colours" toggle, a "Filter & sorting" button opening a right-side drawer (availability, size chips, price range, color swatches, sort dropdown), result count. Built with Bootstrap 5 `Offcanvas` (drawer) + `Dropdown` (sort) + vanilla JS calling Shopify's native filter/sort engine per §3 — no `wpbingo.js`. This section's markup targets the grid in §4.5 (same `section.id`-scoped container Shopify's Section Rendering API swaps), matching the relationship `filter-dropdown.liquid` and `collection-template.liquid` have today.

| Setting id | Type | Label | Default | UX purpose |
|---|---|---|---|---|
| `enable_gender_filter` | checkbox | Show gender quick-filter | `true` | Toggle the pill row seen in reference |
| `enable_color_toggle` | checkbox | Show "show all colours" toggle | `true` | |
| `filter_style` | select (`drawer`/`sidebar`) | Filter layout | `drawer` | Matches reference default; sidebar for merchants preferring legacy layout |
| `show_result_count` | checkbox | Show result count | `true` | |
| `sort_options` | text (comma list) or multi-select | Enabled sort options | `manual,best-selling,price-ascending,price-descending,created-descending,title-ascending` | Lets merchant trim sort menu per collection |

### 4.5 Product Grid — `5dla_collection-product-grid.liquid`

Renders `collection.products`, paired with §4.4's filter state (same facet/URL params, same Section Rendering API swap target). Reference grid: 15 products, no real pagination visible (all render in one pass client-side) — this plan keeps Shopify's real pagination/load-more since production collections will exceed a client-renderable count (see Open Questions). Card features seen in reference: top-left badge (`BESTSELLER`, `WOMEN`), hover "quick add" button, color swatches + `+N` overflow count, no wishlist/compare icon on the card itself.

| Setting id | Type | Label | Default | UX purpose |
|---|---|---|---|---|
| `enable_quick_add` | checkbox | Enable quick add on cards | `true` | Matches reference's hover "+" button |
| `show_badges` | checkbox | Show product badges | `true` | Bestseller/new/sold-out style badges seen in reference |
| `show_swatches` | checkbox | Show color swatches on card | `true` | |
| `swatch_limit` | range (1–10) | Max swatches before "+N" | `4` | Matches `.color-count` (`+2`) pattern |
| `products_per_row_desktop` | range (2–5) | Columns (desktop) | `4` | |
| `products_per_row_mobile` | range (1–2) | Columns (mobile) | `2` | |
| `page_item` | range (1–48) | Products per page | `24` | Reuse existing pattern from `collection-template.liquid` |
| `pagination_style` | select (`pagination`/`loadmore`) | Pagination style | `loadmore` | |
| `empty_state_text` | text | Empty state message | `No products match your filters.` | Shown when facet combination returns zero results |

### 4.6 Content Slots — `5dla_collection-content-slots.liquid`

Reference has a **fixed linear stack after the grid** (not interspersed mid-grid, not repeating every N products): buying guide → FAQ accordion → related links. Best modeled as one blocks-based section so a merchant can reorder/toggle/omit any of these per collection. FAQ renders as a Bootstrap 5 `Accordion` component.

| Section setting id | Type | Label | Default |
|---|---|---|---|
| `enable` | checkbox | Enable | `true` |
| `heading_style` | select (`default`/`eyebrow`) | Section heading style | `eyebrow` (matches reference's small eyebrow + H2 pattern) |

**Block types:**

| Block type | Setting id | Type | Label |
|---|---|---|---|
| `buying_guide` | `heading` | text | Heading |
| | `body` | richtext | Guide content |
| `faq_group` | `heading` | text | Heading |
| | *(sub-blocks not supported in Liquid; use repeated `faq_item` blocks instead, grouped by order)* | — | — |
| `faq_item` | `question` | text | Question |
| | `answer` | richtext | Answer |
| `related_links` | `heading` | text | Heading (e.g. "Related") |
| | `link_label` / `link_url` | text / url | Repeatable per-block link |
| `promo_banner` | `image` | image_picker | Banner image |
| | `heading` / `text` / `button_label` / `button_url` | text / richtext / text / url | Promo content (not seen in this reference but common "content slot" need for future collections) |

### 4.7 Benefits — `5dla_collection-benefits.liquid`

Reference: fixed 3-column icon-less text tiles (`FREE SHIPPING`, `FREE RETURNS`, `CRASH REPLACEMENT`), each a full-tile link, sits between `<main>` and the footer. Existing `featured-policy.liquid` is the closest current pattern (block-based icon+text banner) — model settings after it but simplified to match the flatter reference design.

| Setting id | Type | Label | Default | UX purpose |
|---|---|---|---|---|
| `enable` | checkbox | Enable | `true` | |
| `columns` | range (2–4) | Columns | `3` | Reference uses 3, collapsing to 1 under 1060px |
| `background_color` | color | Background color | `#ffffff` | |

**Blocks** — `benefit` (repeatable):

| Setting id | Type | Label | Default |
|---|---|---|---|
| `icon` | select (theme icon set) or `image_picker` | Icon | none (reference has no icon — text-only tile) |
| `title` | text | Title | `FREE SHIPPING` |
| `subtitle` | text | Subtitle | `on all orders` |
| `url` | url | Link URL | — |

## 5. `templates/collection.basic.5dla.json` — section order

```
breadcrumb          → 5dla_collection-breadcrumb
banner              → 5dla_collection-banner
subcollections      → 5dla_collection-subcollections
filter_sort         → 5dla_collection-filter-sort
product_grid        → 5dla_collection-product-grid
content_slots       → 5dla_collection-content-slots
benefits            → 5dla_collection-benefits
```

All seven are independently toggleable (`enable` setting) and reorderable in the theme editor, per the requirement that this stays editable via JSON template + section schema rather than hardcoded.

## 6. Open questions / risks

1. **Sub-collections vs. gender filter overlap** — the reference's "Sub collections" pill nav (Jerseys/Bib shorts/…) and the toolbar's gender pills (Men/Women/Unisex) look similar in UI but serve different data (collection navigation vs. in-collection filtering). Confirm which should drive actual Shopify collection navigation (URL change) vs. facet filtering (URL param) before building, since they need different underlying mechanisms.
2. **Pagination gap** — the live reference has no real pagination (all 15 products render at once); this plan intentionally keeps Shopify's real pagination/load-more since production collections will exceed that. Confirm expected max collection size to decide default `page_item`.
3. **Icon set for Benefits** — reference has no icons at all; confirm with design whether icons should be added for this theme's version or kept text-only as shown.
4. **Content Slots FAQ grouping** — Shopify block schema has no native nested-block support; the `faq_group` heading + flat `faq_item` blocks (ordered by position) is a workaround, confirm it's acceptable versus one `faq_item` block also carrying an optional group heading field.
5. **Existing Bootstrap conflict** — `assets/bootstrap.min.css` (loaded sitewide via `client/js/style.js`) is **Bootstrap v4.5.3**, not v5. Bootstrap 4→5 has breaking changes (class renames, jQuery removal, utility API changes), so the new v5 CSS/JS must be scoped (e.g. Bootstrap 5's Sass `$prefix` variable, or a wrapper class limiting selectors to the new sections) to avoid clashing with the sitewide v4 build. Confirm scoping approach before writing the SCSS entry, and confirm whether the old v4 include should eventually be retired once other page types migrate.
