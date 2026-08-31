import "../../assets/photoswipe.css";
import "../../assets/css-css-product.css";

function openReviewsTabFromHash() {
  if (window.location.hash !== "#reviews") return;

  var wrapper = document.querySelector(".product-more-info");
  if (!wrapper) return;

  var reviewNavLink = wrapper.querySelector(".more-info-tabs__nav-link.js-tab-review:not(.mobile)")
    || wrapper.querySelector(".more-info-tabs__nav-link.js-tab-review");
  if (!reviewNavLink) return;

  reviewNavLink.click();

  var tabId = reviewNavLink.getAttribute("data-id");
  var target = (tabId && document.getElementById(tabId)) || wrapper;

  window.scrollTo({
    top: target.getBoundingClientRect().top + window.pageYOffset - 233,
    behavior: "smooth"
  });
}

$(function () {
  $(window).on("load", function () {
    setTimeout(openReviewsTabFromHash, 500);
  });
});