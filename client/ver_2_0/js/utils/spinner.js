"use strict";

// Vanilla-JS port of client/js/theme/spinner.js's jQuery `$.fn.spinner()`
// plugin - this ver_2.0 stack loads no jQuery, so it's two plain functions
// instead (used by filter-sort.js for its AJAX loading state).

const STYLE_ID = "c5dla-spinner-style";
const BACKDROP_CLASS = "c5dla-spinner-backdrop";
const SPINNER_CLASS = "c5dla-spinner";

/**
 * Injects the spinner's `@keyframes` + positioning-context helper class
 * once per page - same two rules as the legacy's own inline `<style>`.
 */
const ensureSpinnerStyles = () => {
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    @keyframes c5dla-spinner-spin {
      to { transform: rotate(360deg); }
    }
    .c5dla-spinner-relative { position: relative; }
  `;
  document.head.appendChild(style);
};

/**
 * Starts a spinner overlay on `container` (default: whole page). A
 * page-level spinner (`document.body`) is `position: fixed` and locks
 * scroll; any other container gets a sized `position: absolute` overlay,
 * with the container itself switched to `position: relative` so the
 * overlay positions against it, not a further-up ancestor.
 * @param {Element} [container]
 */
export const startSpinner = (container = document.body) => {
  ensureSpinnerStyles();

  const isPageLevel = container === document.body;

  const backdrop = document.createElement("div");
  backdrop.className = BACKDROP_CLASS;
  Object.assign(backdrop.style, {
    position: isPageLevel ? "fixed" : "absolute",
    top: "0",
    left: "0",
    width: isPageLevel ? "100%" : `${container.offsetWidth}px`,
    height: isPageLevel ? "100%" : `${container.offsetHeight}px`,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: "9998",
  });

  const spinner = document.createElement("div");
  spinner.className = SPINNER_CLASS;
  Object.assign(spinner.style, {
    position: isPageLevel ? "fixed" : "absolute",
    top: "50%",
    left: "50%",
    width: "40px",
    height: "40px",
    margin: "-20px 0 0 -20px",
    border: "4px solid #000",
    borderTop: "4px solid transparent",
    borderRadius: "50%",
    animation: "c5dla-spinner-spin 1s linear infinite",
    zIndex: "9999",
  });

  container.append(backdrop, spinner);

  if (isPageLevel) {
    container.style.overflow = "hidden";
  } else {
    container.classList.add("c5dla-spinner-relative");
  }
};

/**
 * Removes whatever `startSpinner` added to `container`.
 * @param {Element} [container]
 */
export const stopSpinner = (container = document.body) => {
  container.querySelectorAll(`.${BACKDROP_CLASS}, .${SPINNER_CLASS}`).forEach(el => el.remove());

  if (container === document.body) {
    container.style.overflow = "";
  }
};
