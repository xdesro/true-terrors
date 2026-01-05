import path from 'node:path';

import { EleventyRenderPlugin as pluginRender } from '@11ty/eleventy';
import { eleventyImageTransformPlugin as pluginImage } from '@11ty/eleventy-img';
import pluginWebc from '@11ty/eleventy-plugin-webc';
import pluginRss from '@11ty/eleventy-plugin-rss';
import {
  humanReadableDate,
  getTOC,
  youtubeIdFromUrl,
  findPostByPath,
  sortedByDate,
  sortedByPublishDate,
  toSet,
  readTime,
  monthYearDate,
  humanReadableDateTime,
  toISOString,
  getSocialUrl,
} from './_11ty/filters.js';
import { markdownLibrary } from './_11ty/libraries.js';
import { collectionHostedCaseStudy } from './_11ty/collections.js';
import { asMarkdown } from './_11ty/shortcodes.js';

/**
 *  @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig
 */
export default async function (eleventyConfig) {
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
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);

      return `${name}-${width}w.${format}`;
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
  eleventyConfig.addPassthroughCopy('./src/robots.txt');

  eleventyConfig.addCollection('hosted case study', collectionHostedCaseStudy);

  eleventyConfig.addFilter('getTOC', getTOC);
  eleventyConfig.addFilter('youtubeIdFromUrl', youtubeIdFromUrl);
  eleventyConfig.addFilter('findPostByPath', findPostByPath);
  eleventyConfig.addFilter('sortedByDate', sortedByDate);
  eleventyConfig.addFilter('sortedByPublishDate', sortedByPublishDate);
  eleventyConfig.addFilter('toSet', toSet);
  eleventyConfig.addFilter('readTime', readTime);
  eleventyConfig.addFilter('monthYearDate', monthYearDate);
  eleventyConfig.addFilter('humanReadableDateTime', humanReadableDateTime);
  eleventyConfig.addFilter('humanReadableDate', humanReadableDate);
  eleventyConfig.addFilter('toISOString', toISOString);
  eleventyConfig.addFilter('getSocialUrl', getSocialUrl);

  eleventyConfig.addPairedShortcode('asMarkdown', asMarkdown);

  eleventyConfig.setLibrary('md', markdownLibrary);

  return {
    dir: {
      input: 'src',
    },
  };
}
