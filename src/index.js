import { obfuscate } from "javascript-obfuscator";

// let matchFileReg = /\.(my-file-ext)$/
// let matchFile = (path) => matchFileReg.test(path)

export default function obfuscatorPlugin({ matchFile, options = {} } = {}) {
  return {
    name: "vite-plugin-javascript-obfuscator",
    enfore: "post",
    transform(src, id) {
      if (!matchFile || matchFile(id)) {
        const obfuscationResult = obfuscate(src, options);
        let result = { code: obfuscationResult.getObfuscatedCode() };
        if (options.sourceMap && options.sourceMapMode !== "inline") {
          result.map = obfuscationResult.getSourceMap();
        }
        return result;
      }
    },
  };
}
