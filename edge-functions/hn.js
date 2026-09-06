export default async (request, context) => {
  const referer = request.headers.get('referer') || '';
  if (referer.includes('news.ycombinator.com')) {
    return Response.redirect(new URL('/hn', request.url), 303);
  }
  return context.next();
};
