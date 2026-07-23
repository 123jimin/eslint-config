// Deliberately broken. Each `expect:` comment lists the diagnostics its line must report;
// `pnpm test` checks the match exactly.

import {arch} from "node:process"; // expect: simple-import-sort/imports, @typescript-eslint/no-unused-vars
import {EOL} from "node:os";

export function messy(input: unknown): string {
    var text = String(input); // expect: no-var
    if (text == "") { // expect: @stylistic/keyword-spacing, eqeqeq
        text = "empty" // expect: @stylistic/semi
    }
    const wrapped = { value: text }; // expect: @stylistic/object-curly-spacing, @stylistic/object-curly-spacing
      return wrapped.value + EOL; // expect: @stylistic/indent
}

export namespace legacy { // expect: @typescript-eslint/no-namespace
    export const marker = "legacy";
}

export const doubled = [1, 2].map(function (n) { // expect: prefer-arrow-callback
    return n * 2;
});

if(doubled.length === 0) {} // expect: no-empty

const first = "first";
const second = "second";
export {second, first}; // expect: simple-import-sort/exports
