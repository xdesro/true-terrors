import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';

export default [
  {
    input: ['src/js/index.js', 'src/js/home.js', 'src/js/article.js'],
    output: {
      dir: '_site/js',
      format: 'es',
      sourcemap: false,
    },
    plugins: [
      nodeResolve({ dedupe: ['gsap'] }),
      terser({ format: { comments: false } }),
      dynamicImportVars({
        include: 'src/js/routes/**.js',
      }),
    ],
    // plugins: [nodeResolve(), dynamicImportVars()],
  },
];
