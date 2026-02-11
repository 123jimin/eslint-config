// @ts-check

import eslint from "@eslint/js";
import strict from "./strict.js";
import style from "./style.js";

/** @type {import('eslint').Linter.Config[]} */
export default [
    eslint.configs.recommended,
    ...strict,
    ...style,
    {
        rules: {
            "@typescript-eslint/no-unused-vars": "off",
        },
    },
];
