![](https://github.com/xdesro/true-terrors/blob/bd40cb500958dc384947c7a42121322e10a728e4/src/img/og-default.png)

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
### Go-live
- **Content:**
    - ~~Finish YouTube Case~~
    - NYT Case?
    - Matter Case
    - Faculty Case
    - RM Case
    - Blog header images
- Undo/redo splitting call on resize
- Animated underlines on foot breadcrumbs

### Nice-to-have
- ⏳ Ordered diffusion effect for header images _(Sorted, needs build-time service)_
- Design rework of hireme.website?
- Walk back case study row `webc`?
- Sass linting
- JS linting
- Component for code embeds
- Component for asides/footnotes on large screens.
- Remove splitting.js dependency
- Consider speeding up transitions after first visit
- Case studies design blocks need _better_ graphics lol
- Dark mode and grid mode easter eggs

### Ice
- Page wipe transition for external links? _(Not currently possible without modifying Taxi)_

### Sorted
- ✅ Real font licenses
- ✅ Barbed wire scrolling effect
- ✅ Case studies design blocks need graphics
- ✅ Animated link underlines for article blocks.p
- ✅ OpenGraph images service
- ✅ Animated link underlines for case blocks
- ✅ Clearer delineation of reading list posts vs authored posts
- ✅ Embed cards
- ✅ Clearer indication of what happens when you click a case study link
- ✅ Set up RSS feeds
- ✅ Home-to-article route
- ✅ Home-to-case route
- ✅ Article-to-article route
- ✅ Footer breadcrumbs
- ✅ Twitter cards

## Embed Cards
There are two ways to reference embedded articles. The important thing for both of them is the `{% renderTemplate 'webc' %}` tag, which tells 11ty to switch to `webc` rendering temporarily. This workaround is necessary because rendering with markdown and webc breaks code snippets for some reason lol.


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