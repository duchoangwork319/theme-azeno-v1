"use strict";

import { build } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const appsscriptDir = path.join(process.cwd(), "appsscript");
const targets = ["dev.5dla", "main.5dla"];

/**
 * Builds src/main.js into a single self-contained Code.js per GAS target.
 * IIFE output (not "es") because GAS executes the pushed file as a plain
 * global script with no module system - Rollup's iife wrapper needs no
 * import/export machinery at runtime, and src/main.js attaches doPost to
 * globalThis itself so it survives outside the wrapper's closure.
 */
const run = async () => {
  for (const target of targets) {
    const outDir = path.join(appsscriptDir, target, "dist");

    await build({
      root: appsscriptDir,
      configFile: false,
      publicDir: false,
      build: {
        outDir,
        // Never wipe dist/ - appsscript.json (and .clasp.json/package.json
        // living alongside it) must survive every build.
        emptyOutDir: false,
        minify: false,
        rollupOptions: {
          input: path.join(appsscriptDir, "src/main.js"),
          output: {
            format: "iife",
            entryFileNames: "Code.js",
          },
        },
      },
    });
  }
};

run();
