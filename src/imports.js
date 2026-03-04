// @ts-check

import simpleImportSort from "eslint-plugin-simple-import-sort";

/** @type {import('eslint').Linter.Config[]} */
export default [{
    name: "jiminp/imports",
    plugins: {
        "simple-import-sort": simpleImportSort,
    },
    rules: {
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
    },
}];
