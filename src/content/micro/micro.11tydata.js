export default {
  tags: ["micro"],
  layout: "layouts/_post.njk",
  backLink: "/micro",
  backLinkText: "All micro",
  eleventyComputed: {
    text: function (data) {
      return data.page.rawInput;
    },
    publishDate: (data) => data.date,
    footerLinks: function (data) {
      return [
        { name: "Micro", url: "/micro" },
        {
          name: data.date.toISOString(),
          url: `/micro/${this.slugify(data.date.toISOString())}/`,
        },
      ];
    },
    permalink: function ({ date }) {
      return `/micro/${this.slugify(date.toISOString())}/index.html`;
    },
  },
};
