export default {
  tags: ["micro"],
  layout: "layouts/_post.njk",
  eleventyComputed: {
    footerLinks: function(data) {
      return [
        ...data.footerLinks,
        { name: "Micro", url: "/micro" },
        { name: data.date.toISOString(), url: `/micro/${this.slugify(data.date.toISOString())}/` },
    ]}
},
  permalink: function ({ date }) {
    return `/micro/${this.slugify(date.toISOString())}/index.html`;
  },
};
