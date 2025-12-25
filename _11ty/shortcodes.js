import dedent from 'dedent';

import { markdownLibrary } from './libraries.js';
import { footnotePlugin } from './misc.js';

export const asMarkdown = function (str) {
  // `dedent` solves for indentation that happens naturally in HTML files for readability
  const content = dedent(str.trim());
  markdownLibrary.use(footnotePlugin);
  return markdownLibrary.render(content);
};
