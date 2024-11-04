export default {
  permalink: function ({ title }) {
    return `/work/${this.slugify(title)}/index.html`;
  },
  // layout: "_case.webc",
  tags: ["case study"],
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
