export const SITE_TIMEZONE = 'America/Denver';

export const slugFor = (createdAt) =>
  new Date(createdAt)
    .toLocaleString('sv-SE', { timeZone: SITE_TIMEZONE })
    .replace(' ', 't')
    .replaceAll(':', '-');

export const localDateTime = (createdAt) =>
  new Date(createdAt).toLocaleString('en-US', {
    timeZone: SITE_TIMEZONE,
    dateStyle: 'long',
    timeStyle: 'short',
  });
