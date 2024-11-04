export default {
  permalink: function ({ title }) {
    return `/writing/${this.slugify(title)}/index.html`;
  },
  tocHasTitle: true,
  // layout: "_note.webc",
  tags: ["note"],
  date: "Last Modified",
};
