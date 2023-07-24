import { obfuscate, ObfuscatorOptions } from "javascript-obfuscator";
import anymatch, { Matcher } from "anymatch";
import { resolve } from "path";

const defaultIncludeMatcher = [/\.(jsx?|tsx?|cjs|mjs)$/];
const defaultExcludeMatcher = [/node_modules/, /\.nuxt/];

type Options = {
  /**
   * (Array|String|RegExp|Function) String to be directly matched, string with glob patterns, regular expression test, function that takes the testString as an argument and returns a truthy value if it should be matched. default: ```[/\.(jsx?|tsx?|cjs|mjs)$/]```
   * [See more](https://github.com/micromatch/anymatch)
   */
  include?: Matcher;
  /**
   *  (Array|String|RegExp|Function) String to be directly matched, string with glob patterns, regular expression test, function that takes the testString as an argument and returns a truthy value if it should be matched. default: ```[/node_modules/, /\.nuxt/]```
   * [See more](https://github.com/micromatch/anymatch)
   */
  exclude?: Matcher;
  /**
   * Your javascript-obfuscator options
   * [See more options](https://github.com/javascript-obfuscator/javascript-obfuscator)
   */
  options?: ObfuscatorOptions;
  /**
   * Used for debugging, Print out the path of matching or excluding files
   */
  debugger?: boolean;
  /**
   * By default plugins are invoked for both serve and build. In cases where a plugin needs to be conditionally applied only during serve or build
   * https://vitejs.dev/guide/api-plugin.html
   */
  apply?: "serve" | "build" | ((this: void, config: any, env: any) => boolean);
};

type UnArray<T> = T extends any[] ? never : T;

type AnymatchPattern = UnArray<Matcher>;

function handleMatcher(matcher: Matcher): Matcher {
  matcher = matcher instanceof Array ? matcher : [matcher];
  return matcher.map((matcher: AnymatchPattern): AnymatchPattern => {
    if (typeof matcher !== "string") {
      return matcher;
    }
    return resolve(".", matcher).replace(/\\/g, "/");
  });
}

export default function obfuscatorPlugin(obOptions?: Options) {
  let { include, exclude, options }: Options = obOptions || {};

  const consoleLog = obOptions?.debugger ? console.log.bind(console) : () => {};

  options = options || {};

  const includeMatcher = include
    ? handleMatcher(include)
    : defaultIncludeMatcher;

  const excludeMatcher = exclude
    ? handleMatcher(exclude)
    : defaultExcludeMatcher;

  return {
    name: "vite-plugin-javascript-obfuscator",
    enforce: "post" as "post",
    apply: obOptions?.apply || (() => true),
    transform(src: string, id: string) {
      if (anymatch(excludeMatcher, id, { dot: true })) {
        consoleLog("[::plugin-javascript-obfuscator]::exclude", id);
        return;
      }

      if (anymatch(includeMatcher, id)) {
        consoleLog("[::plugin-javascript-obfuscator]::include matched", id);

        const obfuscationResult = obfuscate(src, options);

        const result = { code: obfuscationResult.getObfuscatedCode() } as {
          map: string;
          code: string;
        };

        if (options?.sourceMap && options?.sourceMapMode !== "inline") {
          result.map = obfuscationResult.getSourceMap();
        }
        return result;
      }

      consoleLog(`[::plugin-javascript-obfuscator]::not matched`, id);
    },
  };
}
