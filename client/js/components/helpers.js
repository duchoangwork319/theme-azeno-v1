'use strict';

/**
 * Scrolls the page to the specified element
 * @param {jQuery<HTMLElement>} element - The target element to scroll to
 */
export function scrollTo(element) {
  if (!element || !element.length) return;
  $('html, body').animate({
    scrollTop: element.offset().top - 200
  }, 100);
}

/**
 * Safely parses a JSON string
 * @param {string} text - The JSON string to parse
 * @returns {Object|null} The parsed object or null if parsing fails
 */
export function safeJsonParse(text) {
  try {
    const json = JSON.parse(text);
    return json;
  } catch (error) {
    console.error('Error parsing JSON:', error.message);
  }
  return null;
}