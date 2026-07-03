// @ts-check

/**
 * Shared `no-unused-vars` config for core and `@typescript-eslint` rules.
 * @type {import('eslint').Linter.RuleEntry}
 */
export const NO_UNUSED_VARS = ["error", {varsIgnorePattern: "^_", argsIgnorePattern: "^_"}];
