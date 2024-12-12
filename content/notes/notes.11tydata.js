import getReadTime from "../../_11ty/utils/getReadTime.js";

export default {
  permalink: function ({ title }) {
    return `/writing/${this.slugify(title)}/index.html`;
  },
  hasToc: false,
  layout: "layouts/_article.njk",
  tags: ["note"],
  date: "Last Modified",
  backLink: '/notes',
  backLinkText: 'Back to all notes',
  eleventyComputed: {
    readTime: getReadTime,
    footerLinks: (data) => [
        ...data.footerLinks,
        { name: "Articles", url: "/writing" },
        { name: "Notes", url: "/notes" },
        { name: data.title, url: data.url, isTitle: true },
    ],
  },
};
