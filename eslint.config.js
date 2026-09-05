import eslint from "@eslint/js";
import compat from "eslint-plugin-compat";
import { defineConfig } from "eslint/config";
import prettier from "eslint-config-prettier";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    ignores: [
      ".agents/**",
      ".svelte-kit/**",
      "build/**",
      "dist/**",
      ".wrangler/**",
    ],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  svelte.configs["flat/recommended"],
  {
    ...compat.configs["flat/recommended"],
    files: ["src/**/*.{js,ts,svelte}"],
    ignores: [
      "src/**/*.server.{js,ts}",
      "src/**/+server.{js,ts}",
      "src/lib/server/**",
      "src/**/*.{test,spec}.{js,ts}",
    ],
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    files: ["**/*.svelte.ts", "**/*.svelte.js"],
    languageOptions: {
      parser: tseslint.parser,
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  prettier,
);
