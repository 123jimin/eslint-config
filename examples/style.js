// JavaScript style example for `@jiminp/eslint-config/js`. Must lint clean (`pnpm test`).

import {styleText} from "node:util";

const FALLBACK_NAME = "style.js";

export function greet(name = FALLBACK_NAME) {
    const decorated = styleText("bold", name);
    return `hello, ${decorated}`;
}

export function pickLongest(words) {
    let longest = "";
    for(const word of words) {
        if(word.length > longest.length) {
            longest = word;
        }
    }
    return longest;
}
