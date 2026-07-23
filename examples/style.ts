// TypeScript style example for `@jiminp/eslint-config`. Must lint clean (`pnpm test`).

import {createHash} from "node:crypto";

import type {Linter} from "eslint";

const HASH_LENGTH = 8;

export interface TaggedConfig {
    tag: string;
    configs: Linter.Config[];
}

export function shortHash(text: string): string {
    const digest = createHash("sha256").update(text).digest("hex");
    return digest.slice(0, HASH_LENGTH);
}

export function tagConfigs(tag: string, configs: Linter.Config[]): TaggedConfig {
    if(!tag) throw new Error("tag must not be empty");
    return {tag, configs};
}

export function describeConfig({tag, configs}: TaggedConfig): string {
    const summary = configs.length === 1
        ? "a single config"
        : `${configs.length} configs`;
    return `${tag} (${shortHash(tag)}): ${summary}`;
}

export function* enumerate<T>(items: Iterable<T>): Generator<[number, T]> {
    let index = 0;
    for(const item of items) {
        yield [index, item];
        index += 1;
    }
}

export const DEFAULT_TAG = ((): string => {
    switch(new Date().getUTCDay()) {
        case 0: return "sunday";
        default: return "weekday";
    }
})();
