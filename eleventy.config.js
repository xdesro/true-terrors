import { EleventyRenderPlugin as pluginRender } from '@11ty/eleventy';
import { eleventyImageTransformPlugin as pluginImage } from '@11ty/eleventy-img';
import pluginWebc from '@11ty/eleventy-plugin-webc';
import pluginRss from '@11ty/eleventy-plugin-rss';
import slugify from '@sindresorhus/slugify';

import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItAttr from 'markdown-it-attrs';
import markdownItMathJax from 'markdown-it-mathjax3';
import markdownItPrism from 'markdown-it-prism';

import { JSDOM } from 'jsdom';

/**
 *  @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig
 */
export default function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginRender);
  eleventyConfig.addPlugin(pluginImage, {
    extensions: 'html',
    formats: ['webp', 'jpeg'],
    widths: ['auto', 400, 800, 1400],
    defaultAttributes: {
      loading: 'lazy',
      decoding: 'async',
      sizes: '100vw',
    },
    sharpOptions: {
      animated: true,
      limitInputPixels: false,
    },
  });

  eleventyConfig.addPlugin(pluginWebc, {
    components: ['./src/_components/**/*.webc'],
  });

  eleventyConfig.addWatchTarget('./src/scss/**/*');
  eleventyConfig.addWatchTarget('./src/js/**/*');

  eleventyConfig.addPassthroughCopy('./src/js/vendor', 'js');
  eleventyConfig.addPassthroughCopy('./src/meta');
  eleventyConfig.addPassthroughCopy('./src/fonts');
  eleventyConfig.addPassthroughCopy('./src/img');
  eleventyConfig.addPassthroughCopy('./src/functions');

  eleventyConfig.addCollection('hosted case study', function (collectionsApi) {
    return collectionsApi.getFilteredByTag('case study').filter((el) => {
      return el.page.outputPath;
    });
  });

  eleventyConfig.addFilter('getTOC', (md) => {
    const { document } = new JSDOM(md).window;
    const h2s = [...document.querySelectorAll('h2')];
    const tocData = h2s.map((h2) => {
      if (h2.textContent) {
        return { text: h2.textContent, id: h2.id };
      }
    });

    return tocData;
  });

  eleventyConfig.addFilter('youtubeIdFromUrl', (youtubeUrl) => {
    const url = new URL(youtubeUrl);
    const params = new URLSearchParams(url.search);
    if (params.get('v')) {
      return params.get('v');
    }
    return youtubeUrl;
  });

  eleventyConfig.addFilter(
    'findPostByPath',
    function (collectionsAll, postUrl) {
      const matchedPost = collectionsAll.find(
        (post) => post.outputPath && post.outputPath?.includes(postUrl)
      );
      return { ...matchedPost.data, url: matchedPost.url };
    }
  );

  eleventyConfig.addFilter('sortedByDate', (arr) => {
    return arr.sort((a, b) => b.date - a.date);
  });
  // TODO: This should probably just be a sortBy function that takes a property to sort by as an argument
  eleventyConfig.addFilter('sortedByPublishDate', (arr) => {
    return arr.sort(
      (a, b) => new Date(b.data.publishDate) - new Date(a.data.publishDate)
    );
  });

  eleventyConfig.addFilter('toSet', (arr) => {
    return [...new Set(arr)];
  });

  eleventyConfig.addFilter('readTime', (str) => {
    const { document } = new JSDOM(`${str}`).window;
    // Calculate read time without code samples or mathJax.
    const elementsToRemove = [
      ...document.querySelectorAll('pre, mjx-container'),
    ];
    elementsToRemove.forEach((element) => element.remove());
    const text = document.body.textContent;

    const wordCount = text.split(' ').length;
    const wordsPerMinute = 200;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    return `${readingTime} minute read`;
  });
  eleventyConfig.addFilter('monthYearDate', (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  });

  eleventyConfig.addFilter('humanReadableDateTime', (dateStr) => {
    const date = new Date(dateStr);
    const timezoneDiff = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.valueOf() + timezoneDiff);
    return adjustedDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  });

  eleventyConfig.addFilter('humanReadableDate', (dateStr) => {
    const date = new Date(dateStr);
    const timezoneDiff = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.valueOf() + timezoneDiff);
    return adjustedDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  });

  eleventyConfig.addFilter('toISOString', (str) => {
    return str.toISOString();
  });

  eleventyConfig.setLibrary(
    'md',
    markdownIt({
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
      .use(markdownItPrism)
  );

  return {
    dir: {
      input: 'src',
    },
  };
}
