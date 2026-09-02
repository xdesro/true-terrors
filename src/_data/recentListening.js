import { getTidal } from '../../lib/tidal.js';
export default async () => {
  try {
    return await getTidal();
  } catch {
    return {
      artists: 'Boy Harsher',
      name: 'Jeans',
      url: 'https://tidal.com/track/549253923/u',
    };
  }
};
