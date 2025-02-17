import { JSDOM } from 'jsdom';

export const humanReadableDate = (dateStr) => {
  const date = new Date(dateStr);
  const timezoneDiff = date.getTimezoneOffset() * 60000;
  const adjustedDate = new Date(date.valueOf() + timezoneDiff);
  return adjustedDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export const getTOC = (md) => {
  const { document } = new JSDOM(md).window;
  const h2s = [...document.querySelectorAll('h2')];
  const tocData = h2s.map((h2) => {
    if (h2.textContent) {
      return { text: h2.textContent, id: h2.id };
    }
  });

  return tocData;
};

export const youtubeIdFromUrl = (youtubeUrl) => {
  const url = new URL(youtubeUrl);
  const params = new URLSearchParams(url.search);
  if (params.get('v')) {
    return params.get('v');
  }
  return youtubeUrl;
};

// if this breaks in the future it's because it needs to be a function not an () =>
export const findPostByPath = (collectionsAll, postUrl) => {
  const matchedPost = collectionsAll.find(
    (post) => post.outputPath && post.outputPath?.includes(postUrl)
  );
  return { ...matchedPost.data, url: matchedPost.url };
};

// TODO: This should probably just be a sortBy function that takes a property to sort by as an argument
export const sortedByDate = (arr) => {
  return arr.sort((a, b) => b.date - a.date);
};

export const sortedByPublishDate = (arr) => {
  return arr.sort(
    (a, b) => new Date(b.data.publishDate) - new Date(a.data.publishDate)
  );
};

export const toSet = (arr) => {
  return [...new Set(arr)];
};

export const readTime = (str) => {
  const { document } = new JSDOM(`${str}`).window;
  // Calculate read time without code samples or mathJax.
  const elementsToRemove = [...document.querySelectorAll('pre, mjx-container')];
  elementsToRemove.forEach((element) => element.remove());
  const text = document.body.textContent;

  const wordCount = text.split(' ').length;
  const wordsPerMinute = 200;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return `${readingTime} minute read`;
};

export const monthYearDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
};

export const humanReadableDateTime = (dateStr) => {
  const date = new Date(dateStr);
  const timezoneDiff = date.getTimezoneOffset() * 60000;
  const adjustedDate = new Date(date.valueOf() + timezoneDiff);
  return adjustedDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const toISOString = (str) => {
  return str.toISOString();
};

export const getSocialUrl = (networkName, socialData) => {
  return socialData.find((network) => {
    return network.name.toLowerCase() === networkName.toLowerCase();
  }).url;
};
