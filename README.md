# vite-plugin-javascript-obfuscator

A Vite Plugin for [javascript-obfuscator](https://www.npmjs.com/package/javascript-obfuscator)

## Installation

Install the package:

- npm `npm install --save-dev vite-plugin-javascript-obfuscator`
- yarn `yarn add --dev vite-plugin-javascript-obfuscator`
- pnpm `pnpm i vite-plugin-javascript-obfuscator -D`

## Usage

### Example 1

vite.config.js

```javascript
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";

export default defineConfig({
  plugins: [
    obfuscatorPlugin({
      options: {
        // your javascript-obfuscator options
        debugProtection: true,
        // ...  [See more options](https://github.com/javascript-obfuscator/javascript-obfuscator)
      },
    }),
  ],
});
```

### Example 2

vite.config.js

```javascript
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";

export default defineConfig({
  plugins: [
    obfuscatorPlugin({
      include: ["src/path/to/file.js", "path/anyjs/**/*.js", /foo.js$/],
      exclude: [/node_modules/],
      apply: "build",
      debugger: true,
      options: {
        // your javascript-obfuscator options
        debugProtection: true,
        // ...  [See more options](https://github.com/javascript-obfuscator/javascript-obfuscator)
      },
    }),
  ],
});
```

### Params

|    Name    | Type | Default | Description   |
| :------------: | :----: | :-----: | :----------------------------------------------------------------------------------------------------: | 
| **`include`**  |  `Array\|String\|RegExp\|Function` | `[/\.(jsx?\|tsx?\|cjs\|mjs)$/]` | Configure this option to include files |
| **`exclude`**  |  `Array\|String\|RegExp\|Function` | `[/node_modules/, /\.nuxt/]`| Configure this option to exclude files |
| **`options`**  |  `Object` | javascript-obfuscator default options | [See more options](https://github.com/javascript-obfuscator/javascript-obfuscator) |
| **`apply`**   | `'serve' \| 'build'` | both serve and build. | By default plugins are invoked for both serve and build. In cases where a plugin needs to be conditionally applied only during serve or build, use the apply property to only invoke them during `vite build` or `vite serve`  |
| **`debugger`** | `Boolean` | `false` | Used for debugging, Print out the path of matching or excluding files. |
