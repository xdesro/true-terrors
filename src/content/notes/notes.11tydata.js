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
    meta: function ({ topics, readTime }) {
      const topicsList = topics.filter((topic) => {
        return topic != 'code snippet';
      });
      const formattedList = new Intl.ListFormat('en', {
        style: 'long',
        type: 'conjunction',
      }).format(topicsList);
      return {
        description:
          topics.length &&
          `A quick note about ${formattedList}. It's about a ${readTime}.`,
      };
    },
    og: function ({ title, slug }) {
      let slugged = slug;
      if (!slug) {
        slugged = this.slugify(title);
      }
      const ogTargetUrl = `https://henry.codes/opengraph/writing/${slugged}`;
      const ogScreenshotUrl = `https://screenshot.henry.codes/${encodeURIComponent(
        ogTargetUrl
      )}/opengraph`;
      return ogScreenshotUrl;
    },
  },
};
