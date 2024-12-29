import getReadTime from '../../_11ty/utils/getReadTime.js';

export default {
  permalink: function ({ title }) {
    return `/writing/${this.slugify(title)}/index.html`;
  },
  hasToc: false,
  layout: 'layouts/_article.njk',
  tags: ['note'],
  date: 'Last Modified',
  backLink: '/notes',
  backLinkText: 'All notes',
  eleventyComputed: {
    readTime: getReadTime,
    footerLinks: (data) => [
      ...data.footerLinks,
      { name: 'Articles', url: '/writing' },
      { name: 'Notes', url: '/notes' },
      { name: data.title, url: data.url, isTitle: true },
    ],
    og: function ({ title, slug }) {
      let slugged = slug;
      if (!slug) {
        slugged = this.slugify(title);
      }
      // TODO dev.henry.codes
      const ogTargetUrl = `https://dev.henry.codes/opengraph/writing/${slugged}`;
      const ogScreenshotUrl = `https://screenshot.henry.codes/${encodeURIComponent(
        ogTargetUrl
      )}/opengraph`;
      return ogScreenshotUrl;
    },
  },
};
