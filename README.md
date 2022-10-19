# vite-plugin-javascript-obfuscator

A Vite Plugin for [javascript-obfuscator](https://www.npmjs.com/package/javascript-obfuscator)

## Installation

Install the package:

- npm `npm install --save-dev vite-plugin-javascript-obfuscator`
- yarn `yarn add --dev vite-plugin-javascript-obfuscator`

## Usage

vite.config.js

```javascript
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";

export default defineConfig({
  // ...
  plugins: [
    // other plugin ...
    obfuscatorPlugin({
      options: {
        // your javascript-obfuscator options 

        // compact: true,
        // controlFlowFlattening: false,
        // ...  [See more options](https://github.com/javascript-obfuscator/javascript-obfuscator)
      },
    }),
  ],
  // ...
});
```

**Include or exclude files**

vite.config.js

```javascript
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";

export default defineConfig({
  // ...
  plugins: [
    // other plugin ...
    obfuscatorPlugin({
      matchFile: (path) => {
        // If you want to exclude some files, you can return false
        // Example: Exclude files ending in foo.js, foo.ts, and foo.tsx
        if(/foo\.(js|tsx?)$/.test(path)){
            return false
        }

        // Customize your includes rules. 
        return /\.(js|tsx?|cjs|mjs)$/.test(path) 
      },
      options: {
        // your javascript-obfuscator options 

        // compact: true,
        // controlFlowFlattening: false,
        // ...  [See more options](https://github.com/javascript-obfuscator/javascript-obfuscator)
      },
    }),
  ],
  // ...
});
```
