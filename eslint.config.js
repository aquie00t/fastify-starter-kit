import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: globals.node,
    },
    plugins: {
      js,
      eslintPluginPrettier,
    },
    extends: [
      "js/recommended",
      eslintConfigPrettier,
      eslintPluginPrettierRecommended,
    ],
    rules: {
      "no-console": "error",
      semi: "error",
    },
  },
]);
