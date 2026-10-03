"use strict";

import { build } from "vite";
import autoprefixer from "autoprefixer";
import prefixSelector from "postcss-prefix-selector";
import { readdirSync } from "fs";
import path from "path";

const cwd = process.cwd();

const modeFlagIndex = process.argv.indexOf("--mode");
const mode = modeFlagIndex !== -1 ? process.argv[modeFlagIndex + 1] : "production";

// Root class the ver_2_0 stack's CSS is scoped under (see buildVer2Entry()) -
// kept as one constant so the Liquid side (snippets/2_0-header-styles.liquid,
// layout/2_0-theme.liquid) and the SCSS side agree on the same selector
// without either one importing the other.
const VER_2_0_SCOPE_CLASS = "c5dla-scope";

/**
 * Lists all top-level .js files in a folder.
 * @returns {Array<{name: string, file: string}>}
 */
const listJSFilesIn = folder => {
  const folderPath = path.join(cwd, folder);
  const files = readdirSync(folderPath, { withFileTypes: true });
  return files
    .filter(file => file.isFile() && file.name.endsWith(".js"))
    .map(file => ({
      name: path.basename(file.name, path.extname(file.name)),
      file: path.join(folderPath, file.name),
    }));
};

const currentTimeStamp = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}_${hours}:${minutes}:${seconds}`;
};

/**
 * Base config shared by every entry, legacy or ver_2_0: each entry builds
 * as its own fully self-contained bundle, in a separate Vite invocation
 * (rather than one multi-input build) so entries never share a chunk with
 * each other - they load as plain <script src> tags, not <script
 * type="module">, so cross-entry chunk imports aren't representable in
 * the output.
 * @param {{name: string, file: string}} entry
 * @returns {import('vite').InlineConfig}
 */
const baseConfig = entry => ({
  root: cwd,
  mode,
  configFile: false,
  publicDir: false,
  // Vite defaults to base: "/" (assumes assets are served from the domain
  // root). Shopify serves them from a CDN path, so absolute
  // "/bundled.foo.woff" URLs in emitted CSS 404 - "./" keeps font-face src
  // references relative, resolving correctly next to the CSS file.
  base: "./",
  define: {
    __VERSION__: JSON.stringify(currentTimeStamp()),
  },
  // Silences dart-sass's deprecation warnings (e.g. the `color-functions`
  // warning Bootstrap 5.3's own source triggers on legacy `red()`/`green()`/
  // `blue()` calls - a Bootstrap-side deprecation, not something in this
  // repo's own SCSS to fix). `quietDeps` covers anything loaded from
  // node_modules; `silenceDeprecations` explicitly names the deprecation
  // IDs so they're silenced even if quietDeps' dependency detection ever
  // misses one.
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ["color-functions", "import", "global-builtin", "slash-div", "if-function"],
      },
    },
  },
  build: {
    outDir: path.join(cwd, "assets"),
    emptyOutDir: false,
    minify: mode === "production" ? "esbuild" : false,
    cssMinify: mode === "production",
    rollupOptions: {
      input: {
        [entry.name]: entry.file,
      },
      output: {
        // "es" (not "iife"/"umd") so Vite extracts CSS into its own file
        // instead of injecting styles via JS - these entries have no
        // imports/exports of their own, so the emitted script is a plain
        // script loadable via <script src>, same as before.
        format: "es",
      },
    },
  },
});

/**
 * Builds one legacy `client/js/*.js` entry, unchanged from before this
 * theme was split into legacy vs. ver_2_0 stacks.
 * @param {{name: string, file: string}} entry
 */
const buildLegacyEntry = async entry => {
  const config = baseConfig(entry);

  config.css.postcss = {
    plugins: [autoprefixer()],
  };

  config.build.rollupOptions.output.entryFileNames = "bundled.[name].js";
  config.build.rollupOptions.output.assetFileNames = "bundled.[name][extname]";

  if (entry.name.includes("faker")) {
    // faker.js is a dev-only utility, so don't minify it even in production
    config.build.minify = false;
    config.build.cssMinify = false;
    config.build.rollupOptions.output.format = "iife";
  }

  await build(config);
};

/**
 * Builds one `client/ver_2_0/js/*.js` entry. Output is suffixed `.2.0` so
 * it can never collide with a legacy `bundled.*` asset name, and its
 * compiled CSS is scoped under `.c5dla-scope` (see VER_2_0_SCOPE_CLASS)
 * since this stack carries Bootstrap 5 while the legacy stack still loads
 * Bootstrap 4 sitewide (assets/bootstrap.min.css, via client/js/style.js) -
 * without scoping, same-named classes from the two versions would collide.
 * `:root`/`html`/`body` become the bare wrapper class (not a descendant of
 * it) so Bootstrap 5's CSS custom properties still apply to elements
 * inside the wrapper.
 *
 * Output format: a `css-`-prefixed entry (e.g. client/ver_2_0/js/
 * css-collection.js) stays "es" so Vite still extracts its CSS into its
 * own file - these entries have no real JS of their own, just a single
 * SCSS import. Every OTHER entry (actual behavior, e.g. collection.js)
 * builds as "iife" instead: with "es" + nothing left exported after
 * tree-shaking, esbuild's minifier emitted bare top-level `var`
 * declarations for its mangled names, which - since these load via a
 * plain classic `<script src>`, not `<script type="module">` - attach
 * directly to `window`. That once collided for real: a mangled name
 * landed on `$`, clobbering jQuery's global. "iife" wraps the whole
 * bundle in a function scope, so no mangled identifier can ever leak
 * onto `window`, regardless of what name the minifier happens to pick.
 * @param {{name: string, file: string}} entry
 */
const buildVer2Entry = async entry => {
  const config = baseConfig(entry);
  const isCssOnlyEntry = entry.name.startsWith("css-");

  if (!isCssOnlyEntry) {
    config.build.rollupOptions.output.format = "iife";
  }

  config.css.postcss = {
    plugins: [
      autoprefixer(),
      prefixSelector({
        prefix: `.${VER_2_0_SCOPE_CLASS}`,
        transform(prefix, selector) {
          // `:root`/`html`/`body` (bare, e.g. Bootstrap's own `:root{--bs-*}`)
          // become the bare wrapper class rather than a descendant of it,
          // so Bootstrap 5's CSS custom properties still apply to elements
          // inside the wrapper. Also handles a *leading* `body.foo`/`html.foo`
          // (e.g. a page-wide state class toggled on <body> by JS, like
          // `body.show-all-colours` in client/ver_2_0/js/collection.js) -
          // `.c5dla-scope` is applied to <main>, a descendant of <body>, so
          // a plain `${prefix} body.foo ...` would require `body` to be
          // INSIDE `.c5dla-scope`, which is backwards and never matches.
          // Replacing just the leading tag keeps the rest of the selector
          // (e.g. the trailing `.swatch--extra` descendant) as-is.
          if (/^(:root|html|body)(?![\w-])/.test(selector)) {
            return selector.replace(/^(:root|html|body)/, prefix);
          }
          return `${prefix} ${selector}`;
        },
      }),
    ],
  };

  config.build.rollupOptions.output.entryFileNames = "bundled.[name].2.0.js";
  config.build.rollupOptions.output.assetFileNames = "bundled.[name].2.0[extname]";

  await build(config);
};

/**
 * Orchestrator: builds every legacy entry first, then every ver_2_0 entry.
 * The two stacks don't depend on each other's output, but building legacy
 * first keeps build logs/ordering predictable and matches this repo's
 * "legacy is the baseline, ver_2_0 is additive" convention.
 */
const run = async () => {
  for (const entry of listJSFilesIn("client/js")) {
    await buildLegacyEntry(entry);
  }

  for (const entry of listJSFilesIn("client/ver_2_0/js")) {
    await buildVer2Entry(entry);
  }
};

run();
