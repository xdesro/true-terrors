import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import glsl from 'rollup-plugin-glsl';

export default [
  {
    input: ['src/js/index.js'],
    output: {
      dir: '_site/js',
      format: 'es',
      sourcemap: false,
    },
    plugins: [
      nodeResolve(),
      glsl({
        include: 'src/js/shaders/*.glsl',
      }),
      // terser({ format: { comments: false } }),
      dynamicImportVars({
        include: 'src/js/routes/**.js',
      }),
    ],
  },
  {
    input: ['src/custom/a-website-to-destroy/index.js'],
    output: {
      dir: '_site/js/a-website-to-destroy',
      format: 'es',
      sourcemap: false,
    },
    plugins: [nodeResolve(), terser({ format: { comments: false } })],
  },
  {
    input: ['src/custom/the-first-thing-i-did-was-run/index.js'],
    output: {
      dir: '_site/js/the-first-thing-i-did-was-run',
      format: 'es',
      sourcemap: false,
    },
    plugins: [
      glsl({
        include: 'src/custom/the-first-thing-i-did-was-run/*.glsl',
      }),
      nodeResolve(),
      // terser({ format: { comments: false } })
    ],
  },
];
