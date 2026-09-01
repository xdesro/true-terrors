import { createHash, timingSafeEqual } from 'node:crypto';

import dotenv from 'dotenv';

import { DID, PDS, EPHEMERA_NSID, authenticate } from '../../lib/atproto.js';
import { slugFor } from '../../lib/dates.js';
import { renderForBluesky, renderForMastodon } from '../../lib/render.js';

dotenv.config();

const BLUESKY_POST = 'app.bsky.feed.post';

const sendResponse = (statusCode, body) => ({
  statusCode,
  body: JSON.stringify(body),
});

const digest = (value) => createHash('sha256').update(value).digest();

const authorized = ({ headers }) => {
  if (!process.env.COMPOSER_TOKEN) return false;

  return timingSafeEqual(
    digest(headers['authorization'] ?? ''),
    digest(`Bearer ${process.env.COMPOSER_TOKEN}`),
  );
};

const xrpc = (method, body, jwt) =>
  fetch(`${PDS}/xrpc/${method}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());

const getRecord = (rkey) =>
  fetch(
    `${PDS}/xrpc/com.atproto.repo.getRecord?${new URLSearchParams({
      repo: DID,
      collection: EPHEMERA_NSID,
      rkey,
    })}`,
  ).then((res) => res.json());

const lastSegment = (uri) => uri.split('/').pop();

const syndicationOf = (record, network) =>
  record?.value?.syndications?.find((entry) => entry.network === network);

const firstLink = (facets = []) =>
  facets
    .flatMap((facet) => facet.features)
    .find((feature) => feature.$type.endsWith('#link'))?.uri;

const metaTag = (html, name) =>
  html
    .match(new RegExp(`<meta[^>]*["']${name}["'][^>]*>`, 'i'))?.[0]
    ?.match(/content=["']([^"']*)["']/i)?.[1];

const absolute = (value, base) => {
  try {
    return new URL(value, base).href;
  } catch {
    return undefined;
  }
};

async function scrape(uri) {
  if (!uri) return undefined;

  const html = await fetch(uri)
    .then((res) => res.text())
    .catch(() => '');
  const title = metaTag(html, 'og:title');

  if (!title) return undefined;

  const image = metaTag(html, 'og:image');

  return {
    uri,
    title,
    description: metaTag(html, 'og:description') ?? '',
    image: image && absolute(image, uri),
  };
}

const MAX_THUMB_BYTES = 1000000;

async function uploadThumb(source, jwt) {
  const res = await fetch(source).catch(() => undefined);

  if (!res?.ok) {
    throw new Error(`thumb unreachable (${res?.status ?? 'no response'})`);
  }

  const type = res.headers.get('content-type') ?? '';

  if (!type.startsWith('image/')) {
    throw new Error(`thumb is ${type || 'untyped'}, not an image`);
  }

  const bytes = new Uint8Array(await res.arrayBuffer());

  if (bytes.byteLength > MAX_THUMB_BYTES) {
    throw new Error(
      `thumb is ${bytes.byteLength} bytes, over the ${MAX_THUMB_BYTES} cap`,
    );
  }

  const upload = await fetch(`${PDS}/xrpc/com.atproto.repo.uploadBlob`, {
    method: 'POST',
    headers: { 'Content-Type': type, Authorization: `Bearer ${jwt}` },
    body: bytes,
  })
    .then((res) => res.json())
    .catch(() => ({}));

  if (!upload.blob) throw new Error(upload.message ?? 'uploadBlob failed');

  return upload.blob;
}

let limits;
async function mastodonLimits() {
  limits ??= await fetch(`${process.env.MASTODON_INSTANCE}/api/v2/instance`)
    .then((res) => res.json())
    .then(({ configuration }) => ({
      maxCharacters: configuration.statuses.max_characters,
      charactersReservedPerUrl:
        configuration.statuses.characters_reserved_per_url,
    }))
    .catch(() => undefined);

  return limits;
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return sendResponse(405, {});
  if (!authorized(event)) return { statusCode: 401, body: '' };

  const {
    content,
    targets = [],
    overrides = {},
    visibility = 'public',
    replyTo,
    skipBuild,
  } = JSON.parse(event.body ?? '{}');

  if (!content) return sendResponse(400, { message: 'content is required' });

  const parent = replyTo ? await getRecord(replyTo) : null;

  if (parent && !parent.uri) {
    return sendResponse(400, { message: `no entry at ${replyTo}` });
  }

  const root = parent?.value?.reply?.root
    ? await getRecord(lastSegment(parent.value.reply.root.uri))
    : parent;

  const bluesky = await renderForBluesky(content);
  const mastodon = renderForMastodon(content, {
    limits: await mastodonLimits(),
  });

  const scraped = await scrape(firstLink(bluesky.facets));
  const embed = scraped && {
    uri: scraped.uri,
    title: scraped.title,
    description: scraped.description,
  };

  const blueskyParent = syndicationOf(parent, 'bluesky');
  const blueskyRoot = syndicationOf(root, 'bluesky') ?? blueskyParent;
  const mastodonParent = syndicationOf(parent, 'mastodon');

  const createdAt = new Date().toISOString();

  const blueskyRecord = {
    $type: BLUESKY_POST,
    text: overrides.bluesky ?? bluesky.text,
    createdAt,
    ...(!overrides.bluesky && bluesky.facets && { facets: bluesky.facets }),
    ...(embed && {
      embed: { $type: 'app.bsky.embed.external', external: embed },
    }),
    ...(blueskyParent && {
      reply: {
        root: { uri: blueskyRoot.uri, cid: blueskyRoot.cid },
        parent: { uri: blueskyParent.uri, cid: blueskyParent.cid },
      },
    }),
  };

  const mastodonParams = {
    status: overrides.mastodon ?? mastodon.text,
    visibility,
    ...(mastodonParent && {
      in_reply_to_id: lastSegment(mastodonParent.url),
    }),
  };

  if (event.queryStringParameters?.preview === '1') {
    return sendResponse(200, {
      bluesky: {
        record: blueskyRecord,
        graphemes: bluesky.graphemes,
        overBy: bluesky.overBy,
      },
      mastodon: {
        params: mastodonParams,
        chars: mastodon.chars,
        overBy: mastodon.overBy,
      },
      embed: scraped,
    });
  }

  const jwt = await authenticate();

  const record = {
    $type: EPHEMERA_NSID,
    content,
    createdAt,
    ...(embed && {
      embed: { $type: `${EPHEMERA_NSID}#externalLink`, ...embed },
    }),
    ...(parent && {
      reply: {
        root: { uri: root.uri, cid: root.cid },
        parent: { uri: parent.uri, cid: parent.cid },
      },
    }),
  };

  const note = await xrpc(
    'com.atproto.repo.createRecord',
    { repo: DID, collection: EPHEMERA_NSID, record },
    jwt,
  );

  if (!note.uri)
    return sendResponse(502, { message: 'canonical write failed' });

  const syndicators = {
    bluesky: async () => {
      if (scraped?.image && blueskyRecord.embed) {
        blueskyRecord.embed.external.thumb = await uploadThumb(
          scraped.image,
          jwt,
        );
      }

      const post = await xrpc(
        'com.atproto.repo.createRecord',
        { repo: DID, collection: BLUESKY_POST, record: blueskyRecord },
        jwt,
      );

      if (!post.uri) throw new Error(post.message ?? 'createRecord failed');

      return {
        url: `https://bsky.app/profile/${DID}/post/${lastSegment(post.uri)}`,
        uri: post.uri,
        cid: post.cid,
        text: blueskyRecord.text,
      };
    },

    mastodon: async () => {
      const status = await fetch(
        `${process.env.MASTODON_INSTANCE}/api/v1/statuses`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.MASTODON_ACCESS_TOKEN}`,
            'Idempotency-Key': note.uri,
          },
          body: JSON.stringify(mastodonParams),
        },
      ).then((res) => res.json());

      if (!status.url) throw new Error(status.error ?? 'status failed');

      return { url: status.url, text: mastodonParams.status };
    },
  };

  const attempted = targets.filter((network) => network in syndicators);
  const outcomes = await Promise.allSettled(
    attempted.map((network) => syndicators[network]()),
  );

  const syndications = [];
  const failures = [];

  outcomes.forEach((outcome, index) => {
    const network = attempted[index];

    if (outcome.status === 'fulfilled') {
      syndications.push({ network, syndicatedAt: createdAt, ...outcome.value });
    } else {
      failures.push({ network, message: outcome.reason.message });
    }
  });

  if (syndications.length) {
    await xrpc(
      'com.atproto.repo.putRecord',
      {
        repo: DID,
        collection: EPHEMERA_NSID,
        rkey: lastSegment(note.uri),
        record: { ...record, syndications },
      },
      jwt,
    );
  }

  if (process.env.NETLIFY_BUILD_HOOK && !skipBuild) {
    await fetch(process.env.NETLIFY_BUILD_HOOK, { method: 'POST' }).catch(
      () => {},
    );
  }

  return sendResponse(200, {
    url: `/micro/${slugFor(createdAt)}/`,
    uri: note.uri,
    syndications,
    failures,
  });
};
