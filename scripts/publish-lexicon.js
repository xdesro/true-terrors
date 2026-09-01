import 'dotenv/config';
import { readFileSync } from 'fs';
import { authenticate, PDS, DID } from '../lib/atproto.js';
const path = `./lexicons/website/strange/ephemera.json`;
const JWT = await authenticate();

const lex = JSON.parse(readFileSync(path, 'utf-8'));
const nsid = lex.id;

const res = await fetch(`${PDS}/xrpc/com.atproto.repo.putRecord`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${JWT}`,
  },
  body: JSON.stringify({
    repo: DID,
    collection: 'com.atproto.lexicon.schema',
    rkey: nsid,
    record: { $type: 'com.atproto.lexicon.schema', ...lex },
  }),
});

const json = await res.json();

if (!json.uri) process.exit(1);
console.log(json);
