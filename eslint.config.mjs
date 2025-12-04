import eslint from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import stylistic from "@stylistic/eslint-plugin";
import vuePlugin from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import globals from "globals";

export default [
  eslint.configs.recommended,
  ...vuePlugin.configs["flat/recommended"],
  {
    plugins: {
      "@typescript-eslint": tsPlugin,
      "@stylistic": stylistic,
      "vue": vuePlugin,
    },
    files: ["eslint.config.mjs", "**/*.{ts,vue}"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...stylistic.configs.recommended.rules,

      "object-curly-newline": ["warn", {
        ObjectExpression: {
          multiline: true,
          minProperties: 1,
        },
        ObjectPattern: {
          multiline: true,
        },
        ImportDeclaration: {
          multiline: true,
        },
        ExportDeclaration: {
          multiline: true,
        },
      }],
      "object-property-newline": ["warn", {
        allowAllPropertiesOnSameLine: false,
      }],

      "@typescript-eslint/no-unused-vars": ["warn", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      }],
      "@typescript-eslint/no-empty-function": "warn",

      "@stylistic/quotes": ["warn", "double"],
      "@stylistic/semi": ["warn", "always"],
      "@stylistic/member-delimiter-style": ["warn", {
        multiline: {
          delimiter: "semi",
        },
        singleline: {
          delimiter: "semi",
        },
      }],
      "@stylistic/indent": ["warn", 2],
      "@stylistic/brace-style": ["warn", "1tbs"],
      "@stylistic/arrow-parens": ["warn", "always"],
      "@stylistic/comma-dangle": ["warn", "always-multiline"],
      "@stylistic/jsx-one-expression-per-line": ["warn", {
        allow: "single-line",
      }],
      "@stylistic/eol-last": ["warn", "always"],
      "@stylistic/no-trailing-spaces": "warn",
    },
  },
];
