import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [...compat.extends(
  "eslint:recommended",
  "plugin:@typescript-eslint/recommended",
  "plugin:jsdoc/recommended-typescript",
  "prettier",
), {
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-unused-expressions": ["error", { "allowTernary": true }],

    "@typescript-eslint/no-unused-vars": ["error", {
      argsIgnorePattern: "^_",
    }],

    "no-inner-declarations": "off",

    "prefer-const": ["error", {
      destructuring: "all",
    }],

    "jsdoc/require-template": "error",

    "jsdoc/require-jsdoc": ["warn", {
      contexts: ["MethodDefinition"],
    }],

    "jsdoc/require-description": ["warn", {
      exemptedBy: ["returns", "yields"],
    }],

    "jsdoc/tag-lines": ["warn", "always", {
      count: 0,
      startLines: 1,
    }],

    "jsdoc/check-tag-names": ["warn", {
      definedTags: ["override"],
    }],
  },
}];
