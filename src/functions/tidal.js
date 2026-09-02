import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const ENDPOINT = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${process.env.LAST_FM_USER}&api_key=${process.env.LAST_FM_API_KEY}&format=json&limit=1.`;
export const handler = async (event, context) => {
  return fetch(ENDPOINT, {
    method: 'GET',
  })
    .then((res) => res.json())
    .then(({ recenttracks }) => {
      const track = recenttracks.track[0];
      const artist = track.artist['#text'];
      const { name, url } = track;
      return {
        statusCode: 200,
        body: JSON.stringify({ artists: artist, name, url }),
      };
    });
};
