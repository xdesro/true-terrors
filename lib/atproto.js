export const PDS = 'https://pds.strange.website';
export const DID = 'did:plc:pbr2nzfsr6bcqjeqlvohmh5y';
export const EPHEMERA_NSID = 'website.strange.ephemera';

export async function authenticate() {
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

export async function listRecords(
  collection,
  { repo = DID, limit = 100 } = {},
) {
  const records = [];
  let cursor;

  while (true) {
    const params = new URLSearchParams({ repo, collection, limit });
    if (cursor) params.set('cursor', cursor);

    const res = await fetch(
      `${PDS}/xrpc/com.atproto.repo.listRecords?${params}`,
    );
    const json = await res.json();

    if (!res.ok) {
      throw new Error(`listRecords failed: ${json.error} — ${json.message}`);
    }

    records.push(...json.records);

    if (!json.cursor || json.cursor === cursor) break;
    cursor = json.cursor;
  }

  return records;
}
