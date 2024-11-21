export default {
  permalink: function ({ title }) {
    return `/work/${this.slugify(title)}/index.html`;
  },
  layout: "layouts/_case.njk",
  tags: ["case study"],
  hasToc: true,
  // templateEngineOverride: "md, webc",
  briefAbstract: false,
  tocHasTitle: true,
  eleventyComputed: {
    metaTitle: ({ title }) => {
      return `${title} Case Study | Henry From Online`;
    },
  },
  eleventyNavigation: {
    parent: "Case Studies",
    key: function ({ title }) {
      return title;
    },
  },
};
