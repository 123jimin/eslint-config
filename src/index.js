// @ts-check

export {default as strict} from "./strict.js";
export {default as style} from "./style.js";

import eslint from "@eslint/js";
import strict from "./strict.js";
import style from "./style.js";

/** @type {import('eslint').Linter.Config[]} */
export default [
    eslint.configs.recommended,
    strict,
    ...style,
];
