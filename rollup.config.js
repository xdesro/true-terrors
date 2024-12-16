import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

export default {
  input: "js/index.js",
  output: {
    dir: "_site/js",
    format: "es",
    sourcemap: true
  },
  // plugins: [nodeResolve(), terser({ format: { comments: false } })],
  plugins: [nodeResolve()],
};
