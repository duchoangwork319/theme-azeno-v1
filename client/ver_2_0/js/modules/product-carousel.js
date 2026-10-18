"use strict";

// Swiper carousel for sections/5dla_collection-product-carousel.liquid -
// the grid section's own markup/behavior (variant pickers, quick view,
// lazyload - all wired generically against document-wide selectors in
// collection.js) already works unchanged on these same card snippets
// rendered inside `.swiper-slide` instead of `.products`' grid; this
// module only owns turning `.swiper` into an actual Swiper instance.
//
// Same import shape as ./quick-view.js (Swiper's own CSS has no linked
// file in this bundle - Vite injects it via a runtime `<style>` tag).
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const CAROUSEL_SELECTOR = "[data-c5dla-product-carousel]";

// Mirrors $grid-breakpoints' `md`/`lg` (client/ver_2_0/scss/
// _shared-variables.scss) - Swiper's `breakpoints` are min-width, the
// mirror image of this stack's `media-breakpoint-down`, but the same two
// cutoffs keep the carousel's columns changing at the same points as
// everything else on the page.
const TABLET_BREAKPOINT = 768;
const DESKTOP_BREAKPOINT = 1060;

/**
 * @param {HTMLElement} el
 */
const initOneCarousel = el => {
  if (el.swiper) return;

  const root = el.closest("[data-c5dla-product-carousel-root]");
  const skeleton = root?.querySelector("[data-c5dla-product-carousel-skeleton]") ?? null;
  const prevEl = root?.querySelector("[data-direction=\"-1\"]") ?? null;
  const nextEl = root?.querySelector("[data-direction=\"1\"]") ?? null;

  new Swiper(el, {
    modules: [Navigation],
    slidesPerView: Number(el.dataset.mobileSlides) || 1,
    spaceBetween: 14,
    watchOverflow: true,
    navigation: { prevEl, nextEl },
    breakpoints: {
      [TABLET_BREAKPOINT]: {
        slidesPerView: Number(el.dataset.tabletSlides) || 3,
        spaceBetween: 18,
      },
      [DESKTOP_BREAKPOINT]: {
        slidesPerView: Number(el.dataset.desktopSlides) || 4,
        spaceBetween: 20,
      },
    },
    // `el` itself is never hidden - Swiper measures the container's real
    // width at construction time, so hiding it (display: none) would zero
    // that out and break slide sizing. The skeleton
    // (client/ver_2_0/scss/collection/_product-carousel.scss) sits on top
    // of it instead (`position: absolute`) until this fires, at which
    // point Swiper has already laid the real carousel out underneath.
    on: {
      afterInit() {
        if (skeleton) skeleton.hidden = true;
      },
    },
  });
};

/**
 * @param {ParentNode} [root]
 */
export const initProductCarousel = (root = document) => {
  root.querySelectorAll(CAROUSEL_SELECTOR).forEach(initOneCarousel);
};
