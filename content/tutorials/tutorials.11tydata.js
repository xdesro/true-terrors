import getReadTime from "../../_11ty/utils/getReadTime.js";

export default {
  permalink: function ({ title, slug }) {
    if (slug) return `/writing/${slug}/`;
    return `/writing/${this.slugify(title)}/`;
  },
  eleventyComputed: {
    readTime: getReadTime,
    footerLinks: (data) => [
      ...data.footerLinks,
      { name: "Articles", url: "/writing" },
      { name: data.title, url: data.url, isTitle: true },
    ],
  },
  hasToc: true,
  layout: "layouts/_article.njk",
  tags: ["article"],
  templateEngineOverride: "md",
};
