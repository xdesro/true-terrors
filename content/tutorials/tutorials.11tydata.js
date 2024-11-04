export default {
  permalink: function ({ title, slug }) {
    if (slug) return `/writing/${slug}/`;
    return `/writing/${this.slugify(title)}/`;
  },
  eleventyComputed: {
    footerLinks: (data) => [
      ...data.footerLinks,
      { name: "Articles", url: "/writing" },
      { name: data.title, url: data.url, isTitle: true },
    ],
  },
  layout: "layouts/_article.njk",
  tags: ["article"],
  templateEngineOverride: "md",
};
