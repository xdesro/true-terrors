import fetch from 'node-fetch';

export default async () => {
  return await fetch(`http://henry.codes/.netlify/functions/spotify`)
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
    });
};
