"use strict";

/**
 * Scrolls the page to the specified element
 * @param {jQuery<HTMLElement>} element - The target element to scroll to
 */
export function scrollTo(element) {
  if (!element || !element.length) return;
  $("html, body").animate({
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
    console.error("Error parsing JSON:", error.message);
  }
  return null;
}

/**
 * Extracts all parameters from a given query string into an object
 * @param {string} qs - The query string to parse
 * @returns {Object} The parsed query parameters
 */
export function getQueryStringParams(qs) {
  if (!qs || qs.length === 0) return {};
  const params = {};
  const unescapedQS = decodeURIComponent(qs);
  unescapedQS.replace(new RegExp("([^?=&]+)(=([^&]*))?", "g"), function ($0, $1, $2, $3) {
    params[$1] = $3;
  });
  return params;
}

/**
 * Converts an object of parameters into a query string
 * @param {Object} params - The parameters object to convert to a query string
 * @returns {string} The query string representation of the parameters
 */
export function converToQueryString(params) {
  return Object.entries(params).map(param => param.join("=")).join("&");
}