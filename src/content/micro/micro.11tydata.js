export default {
  tags: ['micro'],
  layout: 'layouts/_post.njk',
  eleventyComputed: {
    text: function (data) {
      return data.page.rawInput;
    },
    footerLinks: function (data) {
      return [
        { name: 'Micro', url: '/micro' },
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
