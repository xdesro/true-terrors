import fetch from 'node-fetch'

export default async () => {
    // TODO go back to fetching actual data
  return {
    artists: [
      {
        name: 'The Comet Is Coming',
        url: 'https://api.spotify.com/v1/artists/0Z5FMozvx15nUSUA6a9kkU'
      }
    ],
    name: 'Summon The Fire',
    url: 'https://open.spotify.com/track/5c44MldQ2CvroamP73V1lp'
  };
//   TODO: Prod url
  return await fetch(
    `http://localhost:9999/.netlify/functions/spotify`
  ).then(res => res.json()).catch(error => {
    console.log(error);
  });
};
