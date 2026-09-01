import { RichText } from '@atproto/api';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

const BLUESKY_GRAPHEME_LIMIT = 300;
const MASTODON_DEFAULTS = { maxCharacters: 500, charactersReservedPerUrl: 23 };
const URL_PATTERN = /https?:\/\/[^\s<>()]+/g;

const overlaps = (a, b) => a.byteStart < b.byteEnd && b.byteStart < a.byteEnd;

const flatten = (markdown, { expandLinks }) => {
  const links = [];
  let text = '';
  let bytes = 0;

  const append = (chunk) => {
    text += chunk;
    bytes += Buffer.byteLength(chunk, 'utf8');
  };

  for (const token of md.parse(markdown, {})) {
    if (token.type === 'paragraph_close' || token.type === 'heading_close') {
      append('\n\n');
      continue;
    }
    if (token.type !== 'inline') continue;

    let href = null;
    let start = 0;

    for (const child of token.children) {
      switch (child.type) {
        case 'link_open':
          href = child.attrGet('href');
          start = bytes;
          break;
        case 'link_close':
          if (expandLinks) append(` (${href})`);
          else links.push({ uri: href, byteStart: start, byteEnd: bytes });
          href = null;
          break;
        case 'softbreak':
        case 'hardbreak':
          append('\n');
          break;
        case 'text':
        case 'code_inline':
          append(child.content);
          break;
      }
    }
  }

  // Trailing only; trimming the front would invalidate every byte offset.
  return { text: text.replace(/\s+$/, ''), links };
};

export const renderForBluesky = async (markdown, { agent } = {}) => {
  const { text, links } = flatten(markdown, { expandLinks: false });
  const richText = new RichText({ text });

  // Only catches what is literally in the text: bare URLs, tags, mentions.
  const detected = await richText
    .detectFacets(agent)
    .then(() => richText.facets ?? [])
    .catch(() => []);

  const facets = [
    ...links.map(({ uri, byteStart, byteEnd }) => ({
      index: { byteStart, byteEnd },
      features: [{ $type: 'app.bsky.richtext.facet#link', uri }],
    })),
    ...detected.filter(
      (facet) => !links.some((link) => overlaps(link, facet.index)),
    ),
  ].sort((a, b) => a.index.byteStart - b.index.byteStart);

  return {
    text,
    facets: facets.length ? facets : undefined,
    graphemes: richText.graphemeLength,
    overBy: Math.max(0, richText.graphemeLength - BLUESKY_GRAPHEME_LIMIT),
  };
};

export const renderForMastodon = (markdown, { limits } = {}) => {
  const { maxCharacters, charactersReservedPerUrl } = {
    ...MASTODON_DEFAULTS,
    ...limits,
  };

  const { text } = flatten(markdown, { expandLinks: true });

  // Every URL bills at a flat rate, whatever its real length.
  const chars = (text.match(URL_PATTERN) ?? []).reduce(
    (total, url) => total - [...url].length + charactersReservedPerUrl,
    [...text].length,
  );

  return { text, chars, overBy: Math.max(0, chars - maxCharacters) };
};
