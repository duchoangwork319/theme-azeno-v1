"use strict";

import { build } from "vite";
import autoprefixer from "autoprefixer";
import { readdirSync } from "fs";
import path from "path";

const cwd = process.cwd();

const modeFlagIndex = process.argv.indexOf("--mode");
const mode = modeFlagIndex !== -1 ? process.argv[modeFlagIndex + 1] : "production";

/**
 * Lists all .js files in the client/js folder (top-level only).
 * @returns {Array<{name: string, file: string}>}
 */
const listJSFiles = () => {
  const folderPath = path.join(cwd, "client/js");
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
 * Builds each client/js entry as its own fully self-contained bundle.
 * Each entry is built in a separate Vite invocation (rather than one
 * multi-input build) so entries never share a chunk with each other -
 * they load as plain <script src> tags, not <script type="module">,
 * so cross-entry chunk imports aren't representable in the output.
 */
const run = async () => {
  const entries = listJSFiles();

  for (const entry of entries) {
    await build({
      root: cwd,
      mode,
      configFile: false,
      publicDir: false,
      // Vite defaults to base: "/" (assumes assets are served from the
      // domain root). Shopify serves them from a CDN path, so absolute
      // "/bundled.foo.woff" URLs in emitted CSS 404 - "./" keeps font-face
      // src references relative, resolving correctly next to the CSS file.
      base: "./",
      define: {
        __VERSION__: JSON.stringify(currentTimeStamp()),
      },
      css: {
        postcss: {
          plugins: [autoprefixer()],
        },
      },
      build: {
        outDir: path.join(cwd, "assets"),
        emptyOutDir: false,
        minify: mode === "production" ? "esbuild" : false,
        cssMinify: mode === "production",
        rollupOptions: {
          input: {
            [entry.name]: entry.file
          },
          output: {
            // "es" (not "iife"/"umd") so Vite extracts CSS into its own
            // file instead of injecting styles via JS - these entries have
            // no imports/exports of their own, so the emitted script is a
            // plain script loadable via <script src>, same as before.
            format: "es",
            entryFileNames: "bundled.[name].js",
            assetFileNames: "bundled.[name][extname]",
          },
        },
      },
    });
  }
};

run();
