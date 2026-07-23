// @ts-check

// Smoke test: every entry point resolves, the style examples lint clean, and
// violations.ts reports exactly its `expect:` annotations.

import console from "node:console";
import {readFileSync} from "node:fs";
import path from "node:path";
import process from "node:process";
import {fileURLToPath} from "node:url";

import defaultConfig, {imports, javascript, strict, style, typescript} from "@jiminp/eslint-config";
import {ESLint} from "eslint";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

/**
 * @param {import('eslint').Linter.Config[]} configs
 * @param {string} file Repo-relative path.
 */
async function lint(configs, file) {
    const eslint = new ESLint({cwd: ROOT, overrideConfigFile: true, overrideConfig: configs});
    const [result] = await eslint.lintFiles([path.join(ROOT, file)]);
    return result.messages;
}

/** @type {Record<string, () => Promise<string[]>>} */
const checks = {
    "entry points": async () => {
        const problems = [];
        if(defaultConfig !== typescript) problems.push('the default export does not match "./ts"');
        for(const [subpath, expected] of Object.entries({imports, js: javascript, strict, style, ts: typescript})) {
            if(!Array.isArray(expected) || expected.length === 0) problems.push(`"./${subpath}" is not a non-empty config array`);
            const {default: config} = await import(`@jiminp/eslint-config/${subpath}`);
            if(config !== expected) problems.push(`"./${subpath}" does not match the aggregated export`);
        }
        return problems;
    },
    "examples/style.ts lints clean": async () => {
        const messages = await lint(typescript, "examples/style.ts");
        return messages.map((m) => `${m.line}:${m.column} ${m.ruleId ?? "(fatal)"} ${m.message}`);
    },
    "examples/style.js lints clean": async () => {
        const messages = await lint(javascript, "examples/style.js");
        return messages.map((m) => `${m.line}:${m.column} ${m.ruleId ?? "(fatal)"} ${m.message}`);
    },
    "examples/violations.ts matches its expectations": async () => {
        /** @type {Map<string, number>} */ const expected = new Map();
        /** @type {Map<string, number>} */ const actual = new Map();
        const source = readFileSync(path.join(ROOT, "examples/violations.ts"), "utf8");
        for(const [index, line] of source.split(/\r?\n/).entries()) {
            const rules = /\/\/ expect: (.+)$/.exec(line)?.[1];
            for(const rule of rules ? rules.split(",") : []) {
                const key = `${index + 1} ${rule.trim()}`;
                expected.set(key, (expected.get(key) ?? 0) + 1);
            }
        }
        for(const message of await lint(typescript, "examples/violations.ts")) {
            const key = `${message.line} ${message.ruleId ?? "(fatal)"}`;
            actual.set(key, (actual.get(key) ?? 0) + 1);
        }
        const problems = expected.size === 0 ? ["no `expect:` annotations were parsed"] : [];
        for(const key of new Set([...expected.keys(), ...actual.keys()])) {
            const want = expected.get(key) ?? 0;
            const got = actual.get(key) ?? 0;
            if(want !== got) problems.push(`line ${key}: expected ${want}, reported ${got}`);
        }
        return problems;
    },
};

const results = await Promise.all(Object.entries(checks).map(async ([label, check]) => [label, await check()]));

let failure_count = 0;
for(const [label, problems] of results) {
    if(problems.length === 0) {
        console.log(`ok: ${label}`);
        continue;
    }
    failure_count += problems.length;
    console.error(`FAIL: ${label}`);
    for(const problem of problems) console.error(`  - ${problem}`);
}

if(failure_count > 0) {
    console.error(`\n${failure_count} problem(s) found.`);
    process.exitCode = 1;
} else {
    console.log("\nAll smoke tests passed.");
}
