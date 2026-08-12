#!/bin/bash

node scripts/vite-build.mjs --mode production

# global
npx terser \
assets/lazysizes.min.js \
assets/handlebars.min.js \
assets/jquery-3.5.1.min.js \
assets/vendor.js \
assets/debounce.js \
assets/enquire.min.js \
assets/jquery.countdown.js \
assets/slick.js \
assets/lodash.min.js \
assets/velocity.min.js \
assets/image.zoom.js \
assets/jquery.tmpl.min.js \
-o assets/bundled.global.min.js \
-c -m
echo "Minified global.min.js."

# wpbingo
npx terser \
assets/wpbingo.js \
assets/facets.js \
assets/predictive-search.js \
-o assets/bundled.wpbingo.min.js \
-c -m
echo "Minified wpbingo.min.js."

# pdp
npx terser \
assets/recent-product.min.js \
assets/360imagerotate.js \
assets/photoswipe.min.js \
assets/photoswipe-ui-default.min.js \
-o assets/bundled.product.min.js \
-c -m
echo "Minified product.min.js."
