import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'js/index.js',
  output: {
    dir: '_site/js',
    format: 'es'
  },
  plugins: [nodeResolve()]
};