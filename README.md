# true-terrors

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run start
```

To run without all the Eleventy logging:

```bash
bun run start:quiet
```

## TODOS
- ⏳ Ordered diffusion effect for header images _(Sorted, needs build-time service)_
- Case studies design blocks need graphics
- Clearer delineation of reading list posts vs authored posts
- ⏳ OpenGraph images service
- Remove splitting.js dependency
- Consider speeding up transitions after first visit
- Walk back case study row `webc`
- Animated link underlines for case blocks
- Page wipe transition for external links?
- Component for code embeds
- ✅ Embed cards
- ✅ Clearer indication of what happens when you click a case study link
- ✅ Set up RSS feeds
- ✅ Home-to-article route
- ✅ Home-to-case route
- ✅ Article-to-article route
- ✅ Footer breadcrumbs
- ✅ Twitter cards

## Embed Cards
There are two ways to reference embedded articles:

### Local Articles
These can use the `:post` attribute to look up a local post by its 11ty URL, but require `collections.all` and the `findPostByPath()` functions.

```html
{% renderTemplate 'webc', { collectionsAll: collections.all } %}
<embed-card :post="findPostByPath(collectionsAll, 'writing/how-to-use-vue-to-template-your-eleventy-projects')"></embed-card>
{% endrenderTemplate %}
```

### External Articles
External articles have a `<slot>` that allows Markdown as an excerpt. Needs the `:external` flag, and then can take props for `title`, `url`, `author`, and `show-url`.
```html
{% renderTemplate 'webc' %}
<embed-card :external="true" title="Sample Title of An Embedded Post" url="https://ethanmarcotte.com/wrote/generative/" author="Ethan Marcotte" :show-url="true">
Nineteen thoughts about “generative artificial intelligence,” spanning a few centuries. Brief, well-curated “playlist” outlining lorem ipsum dolor sit amet
</embed-card>
{% endrenderTemplate %}
```