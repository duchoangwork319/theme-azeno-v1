"use strict";

// Vanilla-JS port of the reference's hero carousel script (inline <script>
// at the bottom of html/revamp/homepage/5dla-homepage.html). Behavior is
// unchanged except the `#hero-pause` pause/play button was dropped per
// spec - autoplay now only respects `prefers-reduced-motion` and still
// stops on hover/focus/tab-hidden (no way left to resume manually, so
// a reduced-motion user simply gets no autoplay rather than a stuck timer).

const SLIDE_SELECTOR = ".five-slide";
const TAB_SELECTOR = "[data-slide]";
const AUTOPLAY_INTERVAL_MS = 6000;

/**
 * Wires one `.five-hero` carousel: slide switching, tab buttons, autoplay
 * with hover/focus/visibility pause, matching the reference's `setSlide`/
 * `start`/`stop`.
 * @param {HTMLElement} hero
 */
const initOneCarousel = hero => {
  const slides = [...hero.querySelectorAll(SLIDE_SELECTOR)];
  const tabs = [...hero.querySelectorAll(TAB_SELECTOR)];
  if (slides.length < 2) return;

  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let active = 0;
  let timer;

  const setSlide = index => {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, n) => {
      const isActive = n === active;
      slide.classList.toggle("is-active", isActive);
      slide.inert = !isActive;
      slide.setAttribute("aria-hidden", String(!isActive));
    });
    tabs.forEach((tab, n) => tab.setAttribute("aria-pressed", String(n === active)));
  };

  const stop = () => clearInterval(timer);

  const start = () => {
    stop();
    if (reducedMotion || document.hidden) return;
    timer = setInterval(() => setSlide(active + 1), AUTOPLAY_INTERVAL_MS);
  };

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      setSlide(Number(tab.dataset.slide));
      start();
    });
  });

  hero.addEventListener("mouseenter", stop);
  hero.addEventListener("mouseleave", start);
  hero.addEventListener("focusin", stop);
  hero.addEventListener("focusout", e => {
    if (!hero.contains(e.relatedTarget)) start();
  });
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

  start();
};

/**
 * @param {ParentNode} [root]
 */
export const initCarousel = (root = document) => {
  root.querySelectorAll(".five-hero").forEach(initOneCarousel);
};
