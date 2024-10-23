// const { exec } = require("child_process");
// const pluginWebc = require("@11ty/eleventy-plugin-webc");
// const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

/**
 *  @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig
 */
module.exports = function (eleventyConfig) {
//   eleventyConfig.addPlugin(pluginWebc, {
//     components: ["./_components/**/*.webc", "npm:@11ty/eleventy-plugin-syntaxhighlight/*.webc"],
//   });
//   eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-syntaxhighlight"));

//   eleventyConfig.addPlugin(eleventyNavigationPlugin);

//   eleventyConfig.addWatchTarget("./_components/*");
  eleventyConfig.addWatchTarget("./scss/**/*");

//   eleventyConfig.addPassthroughCopy("./css");
//   eleventyConfig.addPassthroughCopy("./js");
  eleventyConfig.addPassthroughCopy("./fonts");
  eleventyConfig.addPassthroughCopy("./img");

//   eleventyConfig.on("eleventy.beforeWatch", (changedFiles) => {
//     if (!changedFiles.some((filePath) => filePath.includes("_components"))) {
//       console.log("🤠 Component files updated -- coercing layout reload.");
//       exec("find _components/*.webc -type f -exec touch {} +");
//     }
//   });

//   eleventyConfig.addFilter("getTOC", (md) => {
//     console.log(md);
//     return md;
//   });

//   eleventyConfig.addFilter("sortedByDate", (arr) => {
//     return arr.sort((a, b) => b.date - a.date);
//   });
  // TODO: This should probably just be a sortBy function that takes a property to sort by as an argument
//   eleventyConfig.addFilter("sortedByPublishDate", (arr) => {
//     return arr.sort((a, b) => new Date(b.data.publishDate) - new Date(a.data.publishDate));
//   });

//   eleventyConfig.addFilter("monthYearDate", (date) => {
//     return new Date(date).toLocaleDateString("en-US", {
//       month: "short",
//       year: "numeric",
//     });
//   });

//   eleventyConfig.addFilter("humanReadableDateTime", (date) => {
//     const timezoneDiff = date.getTimezoneOffset() * 60000;
//     const adjustedDate = new Date(date.valueOf() + timezoneDiff);
//     return adjustedDate.toLocaleDateString("en-US", {
//       month: "long",
//       day: "numeric",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       timeZoneName: "longGeneric",
//     });
//   });

//   eleventyConfig.addFilter("humanReadableDate", (date) => {
//     const timezoneDiff = date.getTimezoneOffset() * 60000;
//     const adjustedDate = new Date(date.valueOf() + timezoneDiff);
//     return adjustedDate.toLocaleDateString("en-US", {
//       month: "long",
//       day: "numeric",
//       year: "numeric",
//     });
//   });

//   eleventyConfig.addFilter("dateTimeForUrl", (date) => {
//     const timezoneDiff = date.getTimezoneOffset() * 60000;
//     const adjustedDate = new Date(date.valueOf() + timezoneDiff);
//     // return `${adjustedDate.getUTCFullYear()}-${adjustedDate.getUTCMonth()}-${adjustedDate.getUTCDate()}-${adjustedDate.getUTCHours()}-${adjustedDate.getUTCMinutes()}-${adjustedDate.getUTCSeconds()}`;
//   });

//   console.log(`🚨🚨🚨 ${eleventyConfig.slugify}`);

//   eleventyConfig.setLibrary(
//     "md",
//     require("markdown-it")({
//       html: true,
//       xhtmlOut: false,
//       typographer: true,
//     })
//       .use(require("@iktakahiro/markdown-it-katex"), { throwOnError: true, output: "mathml" })
//       .use(require("markdown-it-attrs"))
//       .use(require("markdown-it-implicit-figures"))
//       .use(require("markdown-it-anchor"), {
//         slugify: require("@sindresorhus/slugify"),
//       })
//     // .use(require("markdown-it-header-sections"))
//   );
};
