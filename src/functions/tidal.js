import { getTidal } from '../../lib/tidal.js';
export const handler = async (event, context) => {
  try {
    const tidalData = await getTidal();

    return {
      statusCode: 200,
      body: JSON.stringify(tidalData),
    };
  } catch {}
};
