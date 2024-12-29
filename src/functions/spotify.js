import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();
export const handler = async (event, context) => {
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
    const auth = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');
    const tokenEndpoint = `https://accounts.spotify.com/api/token`;
    const playerEndpoint = `https://api.spotify.com/v1/me/player/recently-played`;
    const options = {
        method: 'POST',
        headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=refresh_token&refresh_token=${refreshToken}&redirect_uri=${encodeURI(process.env.URL, +'/.netlify/functions/callback')}`
    };
    const accessToken = await fetch(tokenEndpoint, options)
        .then((res) => res.json())
        .then((json) => {
        return json.access_token;
    })
        .catch((err) => {
        console.error(err);
    });
    return fetch(`${playerEndpoint}?limit=1`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
        .then((res) => res.json())
        .then(({ items }) => {
        const { artists: artistsArray, name, external_urls: urls } = items[0].track;
        const artists = artistsArray.map((artist) => ({
            name: artist.name,
            url: artist.href
        }));
        const url = urls.spotify;
        return {
            statusCode: 200,
            body: JSON.stringify({ artists, name, url })
        };
    });
};
