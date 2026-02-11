# @jiminp/eslint-config

Personal ESLint flat config for JavaScript and TypeScript.

Built on top of [`@eslint/js`](https://www.npmjs.com/package/@eslint/js), [`typescript-eslint`](https://typescript-eslint.io/), and [`@stylistic/eslint-plugin`](https://eslint.style/).

## Installation

```sh
pnpm add -D @jiminp/eslint-config @eslint/js @stylistic/eslint-plugin eslint typescript-eslint
```

## Usage

```js eslint.config.js
// TypeScript (default)
import config from "@jiminp/eslint-config";

// JavaScript only
import config from "@jiminp/eslint-config/js";

export default [
    ...config,
];
```

Sub-configs can also be imported individually:

| Export                            | Description                                                     |
| --------------------------------- | --------------------------------------------------------------- |
| `@jiminp/eslint-config` (default) | Same as `./ts`                                                  |
| `@jiminp/eslint-config/ts`        | `recommended` + `tseslint.recommended` + strict + style         |
| `@jiminp/eslint-config/js`        | `recommended` + strict + style (no TS rules)                    |
| `@jiminp/eslint-config/strict`    | Stricter lint rules beyond `recommended`                        |
| `@jiminp/eslint-config/style`     | Stylistic / formatting rules (4-space indent, semicolons, 1tbs) |

## License

[Unlicense](LICENSE)
