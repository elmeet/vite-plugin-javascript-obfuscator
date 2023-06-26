import { obfuscate } from "javascript-obfuscator";

const matchFileReg = /\.(js|tsx?|cjs|mjs)$/;
const _matchFile = (path) => matchFileReg.test(path);

export default function obfuscatorPlugin({ matchFile, options = {} } = {}) {
  matchFile = matchFile || _matchFile;
  if (typeof matchFile !== "function") {
    console.warn(
      "[vite-plugin-javascript-obfuscator] matchFile is not function"
    );
    return;
  }
  return {
    name: "vite-plugin-javascript-obfuscator",
    enforce: "post",
    transform(src, id) {
      if (matchFile(id)) {
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
