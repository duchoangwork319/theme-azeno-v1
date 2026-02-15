#!/bin/bash

# # esbuild
# npx esbuild \
# client/js/faker.js \
# client/js/main.js \
# --bundle \
# --minify \
# --outdir=assets/dist \
# --platform=browser

# # babel
# npx babel assets/dist/main.js --out-dir assets/dist \
# --presets=@babel/preset-env

# npx terser assets/dist/main.js \
# -o assets/dist/main.js -c -m
# echo "Minified main.js."

npx webpack --config webpack.config.js --env prd

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
-o assets/dist/global.min.js \
-c -m
echo "Minified global.min.js."

# wpbingo
npx terser \
assets/wpbingo.js \
assets/facets.js \
assets/predictive-search.js \
-o assets/dist/wpbingo.min.js \
-c -m
echo "Minified wpbingo.min.js."

# pdp
npx terser \
assets/recent-product.min.js \
assets/360imagerotate.js \
assets/photoswipe.min.js \
assets/photoswipe-ui-default.min.js \
-o assets/dist/product.min.js \
-c -m
echo "Minified product.min.js."
