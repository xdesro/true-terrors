export default async (request, context) => {
  const referer = request.headers.get('referer') || '';
  if (referer.includes('news.ycombinator.com')) {
    return new Response('Forbidden', { status: 403 });
  }
  return context.next();
};
