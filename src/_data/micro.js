import { listRecords, EPHEMERA_NSID } from '../../lib/atproto.js';
import { slugFor } from '../../lib/dates.js';
import { markdownLibrary } from '../../_11ty/libraries.js';

const byCreatedAtAsc = (a, b) => new Date(a.createdAt) - new Date(b.createdAt);
const byCreatedAtDesc = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);

function normalize(record) {
  const { content, createdAt, tags, embed, reply, syndications } = record.value;

  return {
    rkey: record.uri.split('/').pop(),
    slug: slugFor(createdAt),
    uri: record.uri,
    cid: record.cid,
    content,
    html: markdownLibrary.render(content),
    createdAt,
    tags: tags ?? [],
    embed,
    reply,
    syndications: syndications ?? [],
  };
}

export default async function () {
  const entries = (await listRecords(EPHEMERA_NSID)).map(normalize);
  const byUri = new Map(entries.map((entry) => [entry.uri, entry]));

  // Index every entry before linking any of them — listRecords comes back
  // newest-first, so replies arrive before the entries they point at.
  const childrenByUri = new Map();
  const roots = [];

  for (const entry of entries) {
    const parentUri = entry.reply?.parent?.uri;

    if (parentUri && byUri.has(parentUri)) {
      childrenByUri.set(parentUri, [
        ...(childrenByUri.get(parentUri) ?? []),
        entry,
      ]);
    } else {
      roots.push(entry);
    }
  }

  const flatten = (entry) => [
    entry,
    ...(childrenByUri.get(entry.uri) ?? [])
      .sort(byCreatedAtAsc)
      .flatMap(flatten),
  ];

  for (const root of roots) {
    root.thread = flatten(root);
    root.startsThread = root.thread.length > 1;

    for (const entry of root.thread) {
      entry.url =
        entry === root
          ? `/micro/${root.slug}/`
          : `/micro/${root.slug}/#${entry.slug}`;
    }

    for (const entry of root.thread) {
      const children = childrenByUri.get(entry.uri) ?? [];

      entry.hasReplies = children.length > 0;

      for (const child of children) {
        child.parentUrl = entry.url;
      }
    }
  }

  return roots.sort(byCreatedAtDesc);
}
