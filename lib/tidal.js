import dotenv from 'dotenv';
dotenv.config();

const LAST_FM = 'https://ws.audioscrobbler.com/2.0/';
const TIDAL_TOKEN = 'https://auth.tidal.com/v1/oauth2/token';
const TIDAL_API = 'https://openapi.tidal.com/v2';
const COUNTRY_CODE = 'US';

// Client credentials are good for a week, so one token per build/invocation.
let tokenPromise;
const getAccessToken = () => {
  const { TIDAL_CLIENT_ID, TIDAL_CLIENT_SECRET } = process.env;
  if (!TIDAL_CLIENT_ID || !TIDAL_CLIENT_SECRET)
    throw new Error('Missing TIDAL_CLIENT_ID or TIDAL_CLIENT_SECRET');

  const auth = Buffer.from(
    `${TIDAL_CLIENT_ID}:${TIDAL_CLIENT_SECRET}`
  ).toString('base64');

  tokenPromise ??= fetch(TIDAL_TOKEN, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })
    .then((res) => {
      if (!res.ok) throw new Error(`TIDAL token responded ${res.status}`);
      return res.json();
    })
    .then(({ access_token }) => access_token);

  return tokenPromise;
};

// Resolve "artist track" to a TIDAL track page.
const getTrackUrl = async (query) => {
  const token = await getAccessToken();

  const params = new URLSearchParams({
    'filter[query]': query,
    countryCode: COUNTRY_CODE,
    include: 'tracks',
  });

  const res = await fetch(`${TIDAL_API}/searchResults?${params}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.api+json',
    },
  });
  if (!res.ok) throw new Error(`TIDAL search responded ${res.status}`);

  const json = await res.json();
  const result = Array.isArray(json.data) ? json.data[0] : json.data;
  const id =
    result?.relationships?.tracks?.data?.[0]?.id ??
    json.included?.find(({ type }) => type === 'tracks')?.id;

  if (!id) throw new Error(`No TIDAL track for "${query}"`);
  return `https://tidal.com/browse/track/${id}`;
};

export const getTidal = async () => {
  const params = new URLSearchParams({
    method: 'user.getrecenttracks',
    user: process.env.LAST_FM_USER,
    api_key: process.env.LAST_FM_API_KEY,
    format: 'json',
    limit: '1',
  });

  const res = await fetch(`${LAST_FM}?${params}`);
  if (!res.ok) throw new Error(`Last.fm responded ${res.status}`);

  const { recenttracks } = await res.json();
  const track = recenttracks?.track?.[0];
  if (!track) throw new Error('Last.fm returned no recent tracks');

  const artists = track.artist['#text'];
  const { name } = track;

  return { artists, name, url: await getTrackUrl(`${artists} ${name}`) };
};
