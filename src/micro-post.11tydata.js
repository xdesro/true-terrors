import { localDateTime } from '../lib/dates.js';

const plainText = (html) =>
  html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const truncate = (text, limit = 200) =>
  text.length > limit ? `${text.slice(0, limit - 1).trimEnd()}…` : text;

export default {
  backLink: '/micro',
  backLinkText: 'All micro posts',
  eleventyComputed: {
    title: ({ post }) => localDateTime(post.createdAt),
    footerLinks: (data) => [
      ...data.footerLinks,
      { name: 'Micro', url: '/micro' },
      { name: data.title, url: data.url, isTitle: true },
    ],
    meta: ({ post }) => ({
      description: truncate(plainText(post.html)),
    }),
    og: ({ post }) => {
      const ogTargetUrl = `https://henry.codes/opengraph/micro/${post.slug}/`;
      const ogScreenshotUrl = `https://v1.screenshot.11ty.dev/${encodeURIComponent(
        ogTargetUrl,
      )}/opengraph`;
      return ogScreenshotUrl;
    },
  },
};
