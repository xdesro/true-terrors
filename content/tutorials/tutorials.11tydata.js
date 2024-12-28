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
    og: ({ slug }) => {
      // TODO dev.henry.codes
      const ogTargetUrl = `https://dev.henry.codes/opengraph/${slug}`;
      const ogScreenshotUrl = `https://screenshot.henry.codes/${encodeURIComponent(
        ogTargetUrl
      )}/opengraph`;
      console.log(ogScreenshotUrl);
      return ogScreenshotUrl;
    },
  },
  hasToc: true,
  layout: 'layouts/_article.njk',
  tags: ['article'],
  templateEngineOverride: 'md',
};
