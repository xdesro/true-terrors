import slugify from '@sindresorhus/slugify';

import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItAttr from 'markdown-it-attrs';
import markdownItMathJax from 'markdown-it-mathjax3';
import markdownItPrism from 'markdown-it-prism';

export const markdownLibrary = markdownIt({
  html: true,
  xhtmlOut: false,
  typographer: true,
})
  .use(markdownItMathJax, {
    svg: {
      scale: 2,
    },
    chtml: { displayAlign: 'left' },
  })
  .use(markdownItAttr)
  .use(markdownItAnchor, {
    slugify,
  })
  .use(markdownItPrism);
