import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

const defaultRules = {
  "no-undef": "error",
  "indent": ["error", 2, { "SwitchCase": 1 }],
  "semi": ["error", "always"],
  "quotes": ["error", "double"]
};

export default defineConfig([
  // 1. Global Ignores (Applies to the entire project)
  {
    ignores: [
      "node_modules/",
      "assets/**/*.js",
      "static/**/*.js",
    ],
  },

  // 2. Base configuration for JS files
  {
    files: [
      "client/**/*.{js,mjs,cjs}",
      "eslint.config.mjs"
    ],
    // js.configs.recommended is the standard way to pull in the plugin's rules
    rules: js.configs.recommended.rules,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        // 3. Custom Global Variables
        ...globals.browser,
        $: "readonly",
        jQuery: "readonly",
        grecaptcha: "readonly",
        wpbingo: "readonly",
        Shopify: "readonly",
        enquire: "readonly",
        _: "readonly",
      }
    },
    rules: defaultRules,
  },

  // 3. Specific override for standard .js files as scripts
  {
    files: ["webpack.config.js"],
    languageOptions: {
      sourceType: "script",
      globals: {
        ...globals.node,
      },
    },
    rules: defaultRules,
  },
]);
