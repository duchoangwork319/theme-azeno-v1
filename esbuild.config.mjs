"use strict";

import esbuild from "esbuild";
import path from "path";
import fs from "fs";

/**
 * Resolve path relative to current working directory
 * @param {string} _path - The relative path
 * @returns {string} The resolved path
 */
function cwd(_path) {
  return path.join(process.cwd(), _path);
}

/**
 * Lists all .js files in the client/js folder.
 */
function listJSFiles() {
  const folderPath = cwd("client/js");
  try {
    const files = fs.readdirSync(folderPath, { withFileTypes: true });
    // esbuild accepts an array of paths for multiple entry points
    return files
      .filter(file => file.isFile() && file.name.endsWith(".js"))
      .map(file => path.join(folderPath, file.name));
  } catch (error) {
    console.error(`Error reading folder: ${error.message}`);
    process.exit(1);
  }
};

const isProd = process.argv.includes("--prd");

/**
 * Build the project using esbuild
 * @param {string[]} entryPoints - An array of entry point paths
 */
async function build(entryPoints) {
  const es = await esbuild.build({
    // Entry points are resolved dynamically just like your Webpack config
    entryPoints: entryPoints,
    bundle: true,
    minify: isProd,
    sourcemap: !isProd,
    outdir: cwd("assets/dist/esbuild"),
    platform: "browser",

    // Equivalent to assetModuleFilename
    assetNames: "[name]",
  });

  if (es.errors.length) {
    throw new Error("Build failed with errors:" + es.errors.join());
  }
}

(async () => {
  try {
    await build(listJSFiles());
    await build([cwd("assets/360imagerotate.js")]);
    console.log("Build completed successfully.");
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
})();