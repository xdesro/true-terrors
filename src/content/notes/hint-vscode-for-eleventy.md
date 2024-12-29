---
title: "Hint VS Code for eleventyConfig autocompletion"
topics:
  - code snippet
  - javascript
  - typescript
date: 2021-10-13T06:00:00.000Z

---

Allows VS Code to start offering intellisense and autocompletion options for the `eleventyConfig` object. Super useful when you're trying to remember the capitalization on `eleventy.addPassthroughCopy()`.

In `.eleventy.js` or `eleventy.config.js`:

```js
/**
 *  @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig
 */
module.exports = (eleventyConfig) => {
  return {};
};
```

_(Maybe obvious, but the `/** ... */` comment is the important part for VSC.)_
