// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

import imports from "./imports.js";
import strict from "./strict.js";
import style from "./style.js";

/** @type {import('eslint').Linter.Config[]} */
export default [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...strict,
    ...style,
    ...imports,
];
