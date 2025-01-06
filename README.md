![](https://github.com/xdesro/true-terrors/blob/bd40cb500958dc384947c7a42121322e10a728e4/src/img/og-default.png)

# True Terrors | The Personal Site & Portfolio of Henry Desroches

The ~~best and brightest~~ worst and darkest portfolio/personal site for the Denver-based creative web developer Henry Desroches. Really quite something. [Looking for a resume](https://github.com/xdesro/resume)? [Looking for the previous iteration](https://github.com/xdesro/soon)? [Looking for the version before that](https://github.com/xdesro/vogue)?

## 📝 Colophon

- Technology:
  - Built with [11ty](https://www.11ty.dev/) and uses Nunjucks and [webc](https://github.com/11ty/webc) in some cases for templating.
  - Brought to life by CSS and [GSAP](https://greensock.com/gsap/).
- Fonts In Use:
  - [Neue Montreal](https://pangrampangram.com/products/neue-montreal), from Pangram Pangram.
  - [Louize](https://www.205.tf/collection/louize), from 205TF.
  - [Mānuka](https://klim.co.nz/retail-fonts/manuka/), from Klim.


🚧 Development

I’ve been using `bun` but I'm sure it works with NPM too.

1. **Install** dependencies:

```bash
bun install
```

2. **Run** the project for local development (hot reloads at localhost:8080):

```bash
bun run start
```

3. **Run** the project without all the Eleventy logging:

```bash
bun run start:quiet
```


3. Generate the static site at _site/ for production:

```bash
bun run build
```

## 🗣 Attribution
Thanks to Andy, Robb, David, Brynski, Levi, and everyone else who had to listen to me talk about this puppy for the past million trillion years.

<hr /> 

## 📝 Embed Cards
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