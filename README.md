# @jiminp/eslint-config

Personal ESLint flat config for JavaScript and TypeScript.

Built on top of [`@eslint/js`](https://www.npmjs.com/package/@eslint/js), [`typescript-eslint`](https://typescript-eslint.io/), [`@stylistic/eslint-plugin`](https://eslint.style/), and [`eslint-plugin-simple-import-sort`](https://github.com/lydell/eslint-plugin-simple-import-sort).

## Installation

```sh
pnpm add -D @jiminp/eslint-config @eslint/js @stylistic/eslint-plugin eslint eslint-plugin-simple-import-sort typescript-eslint
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

| Export                            | Description                              |
| --------------------------------- | ---------------------------------------- |
| `@jiminp/eslint-config` (default) | Same as `./ts`                           |
| `@jiminp/eslint-config/js`        | `recommended` + strict + style + imports |
| `@jiminp/eslint-config/ts`        | `./js` + `tseslint.recommended`          |

Sub-configs can also be imported individually:

| Export                          | Description                                                     |
| ------------------------------- | --------------------------------------------------------------- |
| `@jiminp/eslint-config/strict`  | Stricter lint rules beyond `recommended`                        |
| `@jiminp/eslint-config/style`   | Stylistic / formatting rules (4-space indent, semicolons, 1tbs) |
| `@jiminp/eslint-config/imports` | Import/export sorting via `eslint-plugin-simple-import-sort`    |

## License

[Unlicense](LICENSE)
