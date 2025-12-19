export default {
  permalink: function ({ title }) {
    return `/work/${this.slugify(title)}/index.html`;
  },
  backLink: '/work',
  backLinkText: 'All case studies',
  layout: 'layouts/_case.njk',
  tags: ['case study'],
  hasToc: true,
  briefAbstract: false,
  tocHasTitle: true,
  eleventyComputed: {
    meta: function ({ abstract }) {
      return {
        description: abstract && abstract,
      };
    },
    og: function ({ title, slug }) {
      let slugged = slug;
      if (!slug) {
        slugged = this.slugify(title);
      }
      const ogTargetUrl = `https://henry.codes/opengraph/work/${slugged}`;
      const ogScreenshotUrl = `https://v1.screenshot.11ty.dev/${encodeURIComponent(
        ogTargetUrl
      )}/opengraph`;
      return ogScreenshotUrl;
    },
    footerLinks: (data) => [
      ...data.footerLinks,
      { name: 'Case Studies', url: '/work' },
      { name: data.title, url: data.url, isTitle: true },
    ],
  },
  eleventyNavigation: {
    parent: 'Case Studies',
    key: function ({ title }) {
      return title;
    },
  },
};
