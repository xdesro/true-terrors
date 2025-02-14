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
      terser({ format: { comments: false } }),
      dynamicImportVars({
        include: 'src/js/routes/**.js',
      }),
    ],
  },
];
