import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';

export default [
  {
    input: ['js/index.js', 'js/home.js'],
    output: {
      dir: '_site/js',
      format: 'es',
      sourcemap: false,
    },
    plugins: [
      nodeResolve({ dedupe: ['gsap'] }),
      terser({ format: { comments: false } }),
      dynamicImportVars({
        include: 'js/routes/**.js',
      }),
    ],
    // plugins: [nodeResolve(), dynamicImportVars()],
  },
  // {
  //   input: 'js/home.js',
  //   output: {
  //     dir: '_site/js',
  //     format: 'es',
  //     sourcemap: true,
  //   },
  //   plugins: [nodeResolve(), terser({ format: { comments: false } })],
  //   // plugins: [nodeResolve()],
  // },
];
