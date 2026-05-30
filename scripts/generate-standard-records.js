import 'dotenv/config';
import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';
import matter from 'gray-matter';
import slugify from '@sindresorhus/slugify';

const DID = 'did:plc:pbr2nzfsr6bcqjeqlvohmh5y';
const PDS = 'https://pds.strange.website';
const PUBLICATION_URI =
  'at://did:plc:pbr2nzfsr6bcqjeqlvohmh5y/site.standard.publication/3mn3xvj3ouc2y';

async function authenticate() {
  const res = await fetch(`${PDS}/xrpc/com.atproto.server.createSession`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      identifier: process.env.ATPROTO_HANDLE,
      password: process.env.ATPROTO_APP_PASSWORD,
    }),
  });
  const json = await res.json();
  if (!json.accessJwt) throw new Error(`Auth failed: ${JSON.stringify(json)}`);
  return json.accessJwt;
}

function getPath(data) {
  const slug = data.slug || slugify(data.title);
  return `/writing/${slug}/`;
}

const JWT = await authenticate();

const files = glob.sync([
  'src/content/{tutorials,essays,notes}/**/*.md',
  'src/custom/**/*.njk',
]);

for (const filepath of files) {
  const raw = readFileSync(filepath, 'utf-8');
  const { data, content } = matter(raw);

  if (data.atUri) {
    console.log(`atUri present for ${filepath}. Skipping...`);
    continue;
  }

  if (!data.title) {
    console.warn(`Skipping ${filepath} (no title)`);
    continue;
  }

  const record = {
    $type: 'site.standard.document',
    site: PUBLICATION_URI,
    title: data.title,
    path: getPath(data),
    ...(data.abstract && { description: data.abstract }),
    ...(data.publishDate && {
      publishedAt: new Date(data.publishDate).toISOString(),
    }),
    ...(data.tags && { tags: data.tags }),
  };

  const res = await fetch(`${PDS}/xrpc/com.atproto.repo.createRecord`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JWT}`,
    },
    body: JSON.stringify({
      repo: DID,
      collection: 'site.standard.document',
      record,
    }),
  });

  const json = await res.json();

  if (!json.uri) {
    console.error(`Failed for ${filepath}:`, json);
    continue;
  }

  const updated = matter.stringify(content, { ...data, atUri: json.uri });
  writeFileSync(filepath, updated);
  console.log(`Generated ${filepath} → ${json.uri}`);
}
