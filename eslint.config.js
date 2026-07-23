// @ts-check

import config from "./src/index.javascript.js";

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        name: "jiminp/repo-ignores",
        ignores: ["examples/"],
    },
    ...config,
];
