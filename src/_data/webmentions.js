export default async () => {
  const token = process.env.WEBMENTIONS_IO_TOKEN;
  // const domain = process.env.DOMAIN_NAME;
  const domain = "henry.codes";
  const url = `https://webmention.io/api/mentions.jf2?domain=${domain}&token=${token}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const feed = await response.json();
      return feed.children;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};
