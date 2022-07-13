import babel from "rollup-plugin-babel";
import pkg from "./package.json";
const external = Object.keys(pkg.dependencies);

export default {
  input: "src/index.js",
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "es",
    },
  ],
  external: external,
  sourcemap: true,
  plugins: [babel()],
};
