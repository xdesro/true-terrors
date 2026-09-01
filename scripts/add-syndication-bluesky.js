import 'dotenv/config';

import { authenticate, PDS, DID, EPHEMERA_NSID } from '../lib/atproto.js';

const BLUESKY_POST = 'app.bsky.feed.post';

const [rkey, postUrl] = process.argv.slice(2);

if (!rkey || !postUrl) {
  console.error(
    'usage: node scripts/add-syndication.js <ephemera-rkey> <bsky-post-url>',
  );
  process.exit(1);
}

const getRecord = (collection, key) =>
  fetch(
    `${PDS}/xrpc/com.atproto.repo.getRecord?${new URLSearchParams({
      repo: DID,
      collection,
      rkey: key,
    })}`,
  ).then((res) => res.json());

const note = await getRecord(EPHEMERA_NSID, rkey);

if (!note.uri) throw new Error(`no ephemera record at ${rkey}`);

const post = await getRecord(BLUESKY_POST, postUrl.split('/').pop());

if (!post.uri) throw new Error(`no bluesky post at ${postUrl}`);

const syndication = {
  network: 'bluesky',
  url: postUrl,
  uri: post.uri,
  cid: post.cid,
  text: post.value.text,
  syndicatedAt: post.value.createdAt,
};

const syndications = [
  ...(note.value.syndications ?? []).filter(
    (entry) => entry.network !== 'bluesky',
  ),
  syndication,
];

const jwt = await authenticate();

const res = await fetch(`${PDS}/xrpc/com.atproto.repo.putRecord`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${jwt}`,
  },
  body: JSON.stringify({
    repo: DID,
    collection: EPHEMERA_NSID,
    rkey,
    record: { ...note.value, syndications },
  }),
});

const json = await res.json();

if (!res.ok) throw new Error(`putRecord failed: ${JSON.stringify(json)}`);

console.log(`added bluesky syndication to ${rkey}`);
console.log(syndication);
