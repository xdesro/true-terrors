import getReadTime from '../../_11ty/utils/getReadTime.js';

export default {
  permalink: function ({ title, slug }) {
    if (slug) return `/writing/${slug}/`;
    return `/writing/${this.slugify(title)}/`;
  },
  backLink: '/writing',
  backLinkText: 'All articles',
  eleventyComputed: {
    readTime: getReadTime,
    footerLinks: (data) => [
      ...data.footerLinks,
      { name: 'Articles', url: '/writing' },
      { name: data.title, url: data.url, isTitle: true },
    ],
    og: function ({ title, slug }) {
      let slugged = slug;
      if (!slug) {
        slugged = this.slugify(title);
      }
      const ogTargetUrl = `${
        process.env.URL || 'localhost:8080'
      }/opengraph/writing/${slugged}`;
      const ogScreenshotUrl = `https://screenshot.henry.codes/${encodeURIComponent(
        ogTargetUrl
      )}`;
      return ogScreenshotUrl;
    },
    meta: function ({ excerpt }) {
      return {
        description: excerpt && excerpt,
      };
    },
  },
  hasToc: true,
  hasHero: true,
  layout: 'layouts/_article.njk',
  tags: ['article'],
  templateEngineOverride: 'md,njk',
};
