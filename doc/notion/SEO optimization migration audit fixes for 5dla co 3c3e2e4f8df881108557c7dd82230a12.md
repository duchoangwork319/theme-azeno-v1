# SEO optimization: migration audit fixes for 5dla.com

Due: 5 tháng 9, 2026
Notes: Full SEO migration audit added. Fix canonical product links, localized Product JSON-LD, template H1s, indexation controls, SG currency/meta and market-aware links. Implement only in a duplicate of the current live theme.
Owner: Tuan Tran
Priority: Critical
Status: Todo

<aside>
🔴

**Overall finding:** [5dla.com](http://5dla.com) has a sound international Shopify foundation, but the migration should not be considered complete until the canonical-link, structured-data, indexation, template-H1 and Singapore-localization issues below are fixed and validated.

</aside>

**Audit date:** 21 August 2026  

**Website:** [5dla.com](https://5dla.com/)  

**Source guide:** SEO Migration Guide  

**Scope reviewed:** Shopify settings, live theme, Markets, products, collections, pages, redirects, canonical tags, hreflang, robots, sitemap behavior, headings, metadata, image alt text, internal URLs and structured data.

> No Shopify settings, products, prices or inventory were changed during this audit.
> 

## Priority implementation table

| Priority | Finding | Required update | Acceptance criteria |
| --- | --- | --- | --- |
| Critical | Product cards create collection-scoped URLs such as `/collections/triathlon/products/...`, while the canonical route is `/products/...`. Google is already returning some collection-scoped product URLs. | In a duplicate theme, disable `product_within_collection` and make product links use the canonical `/products/...` path. | All collection cards, recommendations and search links resolve directly to localized canonical product URLs. No redirect chains. |
| Critical | Product JSON-LD uses the store currency HKD instead of the active market currency. Offer URLs may omit the localized market path. | Use a presentment-currency value such as `cart.currency.iso_code` and the localized `canonical_url`. Review duplicate Product schema from theme/app markup. | Rich Results tests for HK, SG and AU show the same currency, price, availability and URL as the visible page. |
| High | Homepage, collection and standard page templates do not output an H1. Product pages do. | Add one meaningful H1 per template: homepage value proposition, collection title and page title. | Rendered source contains one appropriate H1 on each representative template. |
| High | Internal and utility content is indexable, including Frontpage, DESARU20, size-chart data pages and Wishlist. | Remove from the Online Store where possible or apply `noindex,follow`. Add direct 301 redirects only where a relevant replacement exists. | Internal pages are excluded from the index without blocking legitimate product and category crawling. |
| High | The live Singapore storefront shows `$` instead of `S$`. An unpublished theme named “5DLA - SG S$ prices FIXED” contains a pending fix. The SG homepage description still mentions free shipping over HK$1,500. | Merge and QA the currency formatting fix into a fresh duplicate of the current live theme. Use market-neutral or localized homepage metadata. | All SG prices display S$; HK displays HK$; no header/homepage/layout regression; SG search metadata does not use the HK threshold. |
| High | Homepage banners contain hard-coded `/en-hk/search` links. | Replace with locale-aware Shopify routes, preferably canonical Triathlon and Cycling collection links. | Users remain in their selected market and language when clicking every homepage banner. |
| Medium | Four active tri-suit products have no SEO description. | Write unique, product-specific descriptions for TEMPO! PRO Tri Suit, TEMPO! ONE Tri Suit, TEMPO! TWO Tri Suit and Womens TEMPO! ONE Tri Suit. | Each page has a unique meta description under approximately 160 characters and non-empty schema description. |
| Medium | Two product SEO titles exceed 60 characters before the theme adds “– 5DLA”. | Shorten Womens TEMPO! PRO Flex Bib Shorts and Mens TEMPO! Road Race Suit titles without losing product intent. | Rendered titles remain concise and unique after the site-name suffix. |
| Medium | Of 18 collections, 9 lack SEO titles and 10 lack SEO descriptions. | Add metadata to customer-facing collections such as Recharge, Preorder and Unisex. Hide/noindex internal, empty and campaign collections instead of optimizing them. | Every indexable commercial collection has unique title and description metadata. |
| Medium | Homepage and collection JSON-LD snippets are empty; page JSON-LD logo syntax may be invalid. | Add restrained Organization/WebSite schema on the homepage and BreadcrumbList on collections. Correct the page logo JSON encoding and validate rendered output. | Schema validators report valid entities without conflicting duplicate Product entities. |
| Low | Copy and maintenance issues remain: “Returns and Exchnage”, “slighly longer”, irrelevant earrings return copy, placeholder product markup, placeholder social URLs and a large duplicated theme asset footprint. | Correct copy; remove crawl-visible placeholder blocks; replace or omit placeholder social profiles; review unused theme assets separately. | No placeholder product/social content is present in rendered source and customer-facing copy is accurate. |

## Detailed findings

### Markets and localization

- Eight active markets were confirmed: Australia, Hong Kong, Malaysia, New Zealand, Philippines, Singapore, Thailand and Viet Nam.
- Enabled currencies: AUD, HKD, MYR, NZD, PHP, SGD, THB and VND.
- Market subfolders and published languages are configured.
- Shopify Markets automatically manages localized canonical URLs, hreflang annotations, localized sitemap entries and `x-default`. Do not replace these with custom theme logic unless a verified defect exists.
- The existing live Singapore currency-display issue remains unresolved. The older draft theme must not be published directly because it previously showed header and homepage breakage.

### Products

- 33 active products reviewed.
- All active products have SEO titles.
- Missing SEO descriptions:
    - TEMPO! PRO Tri Suit
    - TEMPO! ONE Tri Suit
    - TEMPO! TWO Tri Suit
    - Womens TEMPO! ONE Tri Suit
- Titles requiring shortening:
    - Womens TEMPO! PRO Flex Bib Shorts
    - Mens TEMPO! Road Race Suit
- Sampled product media have descriptive alt text. Perform a final full-gallery check for products with more than ten images.
- Product pages have an H1.
- Product schema must be corrected for localized currency and offer URL.

### Collections and indexation

- 18 collections reviewed.
- 9 have no custom SEO title; 10 have no custom SEO description.
- Consumer-facing collections needing metadata include Recharge, Preorder and Unisex.
- Internal or low-value collections requiring removal/noindex review:
    - Frontpage / “Home page”
    - DESARU20 eligible products
    - New Arrivals with title “SALE” and zero products
    - Seasonal Selected
    - Seasonal Clearance
    - Gifts
    - Sales on March
- Google has surfaced internal examples including [Frontpage](https://5dla.com/zh-hans-sg/collections/frontpage), [DESARU20 page 2](https://5dla.com/vi-vn/collections/desaru20-eligible-products?page=2) and collection-scoped product routes.

### Pages and URLs

- 41 pages exist; 39 are published.
- Eighteen raw size-chart helper pages are published and potentially indexable.
- Review Wishlist, Shop page and all modal/helper pages for `noindex,follow`.
- Correct “Returns and Exchnage”.
- One size-chart handle contains `tirsuit`; if corrected, create a direct 301 from the old URL.
- Current redirects are direct and no chains were found.
- Replace hard-coded Hong Kong homepage search links with locale-aware collection routes.

### Theme and technical SEO

- Primary domain uses HTTPS and SSL.
- A self-referencing canonical link is present.
- The customized robots template preserves Shopify default groups and sitemap output.
- Product template has an H1; homepage, collection and standard page templates do not.
- `product_within_collection` is enabled and causes inconsistent internal product URLs.
- Product JSON-LD uses `shop.currency`, creating a multi-market currency mismatch.
- Homepage and collection JSON-LD files are empty.
- Remove crawl-visible “Example Product Title” placeholder markup if the related block is unused.
- Social profile theme settings contain `#` or blank values; do not output them as Organization `sameAs` links.

## What already passes

- [x]  Primary HTTPS domain and SSL
- [x]  Eight active international markets and currencies
- [x]  Shopify canonical tag present
- [x]  Shopify default robots groups retained
- [x]  Sitemap declaration retained
- [x]  Product pages have an H1
- [x]  Active products have SEO titles
- [x]  Sampled product image alt text is descriptive
- [x]  Existing redirects are direct with no chains
- [x]  No inventory, price or product-status changes are required for this SEO work

## Safe implementation sequence

1. Duplicate the **current live theme**, not the older broken SG draft.
2. Disable collection-scoped product URLs and QA every product-link surface.
3. Correct localized Product JSON-LD and validate HK, SG and AU.
4. Add H1 output to homepage, collection and standard page templates.
5. Apply indexation controls to internal collections and utility pages.
6. Merge the SG S$/HK$ formatting fix into the current duplicate theme.
7. Replace hard-coded Hong Kong links.
8. Complete missing product and collection metadata.
9. Remove placeholder markup and correct content errors.
10. Preview on desktop/mobile across HK, SG, AU and one non-English market.
11. Publish only after regression QA.
12. Submit/verify sitemap and inspect canonical, hreflang and index coverage in Google Search Console and Bing Webmaster Tools.

## Mandatory QA checklist

- [ ]  Work performed on a duplicate of the current live theme
- [ ]  Header, navigation, homepage, PDP, cart and market selector unaffected
- [ ]  HK prices display HK$ and SG prices display S$
- [ ]  Product price/currency/availability match JSON-LD
- [ ]  Product links use canonical localized `/products/...` URLs
- [ ]  One appropriate H1 on each primary template
- [ ]  Internal utility pages noindexed or unpublished
- [ ]  No canonical or hreflang duplication
- [ ]  No redirect chains
- [ ]  Rich Results validation passed
- [ ]  Mobile and desktop testing passed
- [ ]  Google Search Console sitemap and index coverage checked

## Reference guidance

- [Shopify Markets international SEO](https://help.shopify.com/en/manual/markets/seo)
- [Shopify robots.txt guidance](https://help.shopify.com/en/manual/promoting-marketing/seo/editing-robots-txt)
- [Shopify sitemap guidance](https://help.shopify.com/en/manual/promoting-marketing/seo/find-site-map)

## Guardrails

- Do not alter valid prices, inventory or live product status for this task.
- Do not publish an old draft theme over the current live theme.
- Do not hard-code hreflang, canonical URLs or currency values without market testing.
- Any URL rename must include a verified direct 301 when a relevant replacement exists.
- Take a fresh backup and record the theme ID before implementation.