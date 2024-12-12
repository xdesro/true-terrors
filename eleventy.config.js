// const { exec } = require("child_process");
import { EleventyRenderPlugin as pluginRender } from "@11ty/eleventy";
import pluginWebc from "@11ty/eleventy-plugin-webc";
// const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
import slugify from "@sindresorhus/slugify";

import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItAttr from "markdown-it-attrs";
import markdownItMathJax from "markdown-it-mathjax3";

import { JSDOM } from "jsdom";

/**
 *  @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig
 */
export default function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRender);
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPlugin(pluginWebc, {
    components: [
      "./_components/**/*.webc",
      "npm:@11ty/eleventy-plugin-syntaxhighlight/*.webc",
    ],
  });
  //   eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-syntaxhighlight"));

  //   eleventyConfig.addPlugin(eleventyNavigationPlugin);

  //   eleventyConfig.addWatchTarget("./_components/*");
  eleventyConfig.addWatchTarget("./scss/**/*");
  eleventyConfig.addWatchTarget("./js/**/*");

  //   eleventyConfig.addPassthroughCopy("./css");
  // eleventyConfig.addPassthroughCopy("./js");
  eleventyConfig.addPassthroughCopy("./meta");
  eleventyConfig.addPassthroughCopy("./fonts");
  eleventyConfig.addPassthroughCopy("./img");
  eleventyConfig.addPassthroughCopy("./functions");

  //   eleventyConfig.on("eleventy.beforeWatch", (changedFiles) => {
  //     if (!changedFiles.some((filePath) => filePath.includes("_components"))) {
  //       console.log("🤠 Component files updated -- coercing layout reload.");
  //       exec("find _components/*.webc -type f -exec touch {} +");
  //     }
  //   });

  eleventyConfig.addFilter("getTOC", (md) => {
    const { document } = new JSDOM(md).window;
    // console.log(JSON.stringify(dom.window.document))c
    const h2s = [...document.querySelectorAll("h2")];
    const tocData = h2s.map((h2) => {
      if (h2.textContent) {
        return { text: h2.textContent, id: h2.id };
      }
    });

    return tocData;
  });

  eleventyConfig.addFilter("youtubeIdFromUrl", (youtubeUrl) => {
    // https://www.youtube.com/watch?v=P-I5D6BlejM
    const url = new URL(youtubeUrl);
    const params = new URLSearchParams(url.search);
    if (params.get("v")) {
      return params.get("v");
    }
    return youtubeUrl;
  });

  //   eleventyConfig.addFilter("sortedByDate", (arr) => {
  //     return arr.sort((a, b) => b.date - a.date);
  //   });
  // TODO: This should probably just be a sortBy function that takes a property to sort by as an argument
  eleventyConfig.addFilter("sortedByPublishDate", (arr) => {
    return arr.sort(
      (a, b) => new Date(b.data.publishDate) - new Date(a.data.publishDate)
    );
  });

  eleventyConfig.addFilter("toSet", (arr) => {
    return [...new Set(arr)];
  });

  eleventyConfig.addFilter("readTime", (str) => {
    const { document } = new JSDOM(`${str}`).window;
    // Calculate read time without code samples or mathJax.
    const elementsToRemove = [
      ...document.querySelectorAll("pre, mjx-container"),
    ];
    elementsToRemove.forEach((element) => element.remove());
    const text = document.body.textContent;

    const wordCount = text.split(" ").length;
    const wordsPerMinute = 200;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    return `${readingTime} minute read`;
  });
  eleventyConfig.addFilter("monthYearDate", (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  });

  eleventyConfig.addFilter("humanReadableDateTime", (dateStr) => {
    const date = new Date(dateStr);
    const timezoneDiff = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.valueOf() + timezoneDiff);
    return adjustedDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  });

  eleventyConfig.addFilter("humanReadableDate", (dateStr) => {
    const date = new Date(dateStr);
    const timezoneDiff = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.valueOf() + timezoneDiff);
    return adjustedDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  });

  eleventyConfig.addFilter("toISOString", (str) => {
    return str.toISOString();
  });

  //   eleventyConfig.addFilter("dateTimeForUrl", (date) => {
  //     const timezoneDiff = date.getTimezoneOffset() * 60000;
  //     const adjustedDate = new Date(date.valueOf() + timezoneDiff);
  //     // return `${adjustedDate.getUTCFullYear()}-${adjustedDate.getUTCMonth()}-${adjustedDate.getUTCDate()}-${adjustedDate.getUTCHours()}-${adjustedDate.getUTCMinutes()}-${adjustedDate.getUTCSeconds()}`;
  //   });

  eleventyConfig.setLibrary(
    "md",
    markdownIt({
      html: true,
      xhtmlOut: false,
      typographer: true,
    })
      .use(markdownItMathJax, {
        chtml: { displayAlign: "left" },
      })
      .use(markdownItAttr)
      //       .use(require("markdown-it-implicit-figures"))
      .use(markdownItAnchor, {
        slugify,
      })
    //     // .use(require("markdown-it-header-sections"))
  );
}
