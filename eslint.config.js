// @ts-check

import config from "./src/index.js";

/** @type {import('eslint').Linter.Config[]} */
export default [
    ...config,
    {
        rules: {
            "@typescript-eslint/no-unused-vars": "off",
        },
    },
];
