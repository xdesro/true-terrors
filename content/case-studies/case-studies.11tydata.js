export default {
  permalink: function ({ title }) {
    return `/work/${this.slugify(title)}/index.html`;
  },
  backLink: '/work',
  backLinkText: 'All case studies',
  layout: 'layouts/_case.njk',
  tags: ['case study'],
  hasToc: true,
  // templateEngineOverride: "md, webc",
  briefAbstract: false,
  tocHasTitle: true,
  eleventyComputed: {
    meta: function ({ abstract }) {
      return {
        description: abstract && abstract,
      };
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
