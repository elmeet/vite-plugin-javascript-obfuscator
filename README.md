# vite-plugin-javascript-obfuscator

Vite plugin for javascript-obfuscator

## Installation

Install the package:

- npm `npm install --save-dev vite-plugin-javascript-obfuscator`
- yarn `yarn add --dev vite-plugin-javascript-obfuscator`

## Usage


vite.config.js
```javascript
import obfuscatorPlugin from 'vite-plugin-javascript-obfuscator'


export default defineConfig({
    // ... 
    plugins: [
        // other plugin ...
        obfuscatorPlugin({
            matchFile: path => {
                // Customize your rules    
                return /\.(ob-max)\.js$/.test(path)

                // Or return true to match all
                // return true
            },
            options: {
                // compact: true,
                // controlFlowFlattening: false,
                // controlFlowFlatteningThreshold: 0.75,
                // deadCodeInjection: false,
                // deadCodeInjectionThreshold: 0.4,
                // debugProtection: false,
                // debugProtectionInterval: 0,
                // ... [See more](https://github.com/javascript-obfuscator/javascript-obfuscator)
            }
        }),
    ]
    // ...
})

```
