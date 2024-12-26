---
title: How To Make a Website
slug: how-to-make-a-website
heroImage: ./img/ct5.how-to-make-a-website.png
excerpt: I got an email recently from a kind online friend asking to learn about my process or what makes a good website. It's also good impetus for me to be a little more candid and critical about my practice — here's my breakdown on how to make a Good Website.
publishDate: 2023-01-16T22:31-05:00
socialSharingImage: ./img/ct5.how-to-make-a-website.png
featured: true
tags:
  - article
category: resource
topics:
  - html
  - css
  - javascript
  - rants
---

I got an email recently from a kind online friend who said they thought my work was swell, and that they'd like to ask about my process or what makes a good website. Aside from that being a really nice email to receive, it's also good impetus for me to be a little more candid and critical about my practice. Here's my breakdown on how to make a Good Website.

It's fine if you disagree with me on these things — let me know by email what great sins I have committed against thee and I shall dearly repent :){.editors-note}

## TL;DR

Write meaningful HTML that communicates the structure of your document before any style or additional interactivity has loaded. Write CSS carefully, reason your methodology and stick to it, and feel empowered to skip frameworks. When it comes time to write JavaScript, write not too much, make sure you know what it all does, and above all, make sure the website works without it.

## A Brave New index.html File

HTML is meant to communicate document structure and information, and it does a really good job of doing that if you let it. Before starting the styling steps of any project, I write all of my pages out from a content document or design file completely in HTML. I find this reveals a lot about interactions that need to be considered and information architecture that isn't quite ready for prime time. Even if I'm using some SPA framework, I'll still start by communicating the entire document with HTML alone, because I've found it's that much clearer when it’s time to break the markup into whatever the component style _du jour_ happens to be.

Get creative with tagging. There's a world beyond `<div>`s and `<span>`s (_though sometimes these are exactly what you need_) — don't forget about the `<main>`s and `<section>`s and `<aside>`s for laying out content, and the `<time>`s or `<abbr>`s or `<dl>`s for communicating more complex data. Spend some time reading about elements in MDN, or even the HTML spec. Let yourself discover the breadth of the language. Every week you'll discover something new you could've been using this whole time.

Don't worry about class attributes just yet, but do worry about semantic attributes like those needed to make a `<form>` work properly. We'll hydrate our markup with CSS as needed; now's a good time to be certain our website is bulletproof from a semantics perspective.

If, in this process, you discover your document is confusing or ordered incorrectly, this is the perfect time to address that. CSS has a lot of superpowers when it comes to layout these days, so consider whether it's possible to write the HTML in the correct flow and solve for unique challenges with style code down the line. If it's _not_ possible, that might be a good sign to talk with your designers about their intention. Often you'll find that something that doesn't make sense from an HTML perspective was an afterthought, or might be better served somewhere else!

### A Note On Accessibility

You'll find that spending more time getting HTML right reveals or even anticipates and evades accessibility issues. It's just easier to write accessible code if it's got semantic foundations.

You'll further find that once you've gotten used to spec-diving, the WCAG can be a really fun way to give yourself and your users wins. The more time you spend looking for and fixing accessibility issues, the more clever you'll feel when you start to preempt them on your next project.

It's important to note that making sure users of all stripes (_not solely the ones your product manager has deemed important enough_) can be successful using the things you create is literally, like, the job. Designers will do their best to discover issues beforehand, testing and interviews can solve issues later in the process, but at the end of the day, your hand is the one that brings The Thing into being. Bringing accessibility expertise into your stables will make you an extremely formidable developer, it's a consistent value-add to any project, and it further makes you a far better citizen of the internet.

### A Note On Communication

This isn't HTML-specific, but this advice has taken me further than any blog tutorial ever has:

Be kind and curious and humble when you're working with folks, and be extra forgiving of their mistakes, so when the time inevitably comes that you make your own, there's perhaps some goodwill in the vault for you. This might not seem like a consideration for “How To Make A Website”, but making things for the internet takes a village, and you'll be astounded how much you naturally become a better developer if you default to listening and checking your ego. That's been a hard lesson to learn, especially the more I feel confident in my ability as a web developer, but it’s certainly been one of the more valuable ones.

### Personal Tooling

These days (late 2022, early 2023) I primarily use 11ty to build websites, because it has a very low level of opinion and abstraction — it provides lift where I need it without deciding HOW it ought to provide lift. Its primary use in my development process is merging content with templates. I can use flat files like markdown, query content APIs like Wordpress or Contentful at build time, etc, and serve static HTML to users with no client-side JavaScript payload.

I usually use either Nunjucks or Vue for template logic as they're both extremely similar to HTML (abstraction is the devil). I default to the former for simpler projects with less data massaging or for projects with collaboration with non-Vue developers. 11ty makes Vue feel great — I can write filters and computed data and interpolations without serving any client-side Javascript to users.

Nunjucks is a first-class citizen in 11ty, but I've also written a (possibly slightly out-of-date) guide on [using Vue templates in 11ty](https://henry.codes/writing/how-to-use-vue-to-template-your-eleventy-projects).

<!-- <test-component></test-component> -->

📯{.editors-note}

## Style Code (or How I Learned To Stop Worrying and Love The Cascade)

There's no need to fear CSS. It's not the language it was in 2012, rife with vendor prefixes and secret hacks to trick it into solving your layout problems. Between the CSS grid API and container queries and custom properties/variables and scroll timelines and filters and layers and math functions, there's hardly a thing one needs Javascript for these days.

### A Quick Thing About Preprocessors

I still use Sass for most projects! It’s still really good! Leveraging the file structure, nesting architecture, and `$` tokens maintains its place as a super high value member to any CSS tooling.

Be wary of over-nesting and getting clever with Sass features — as with all aspects of code, it's better to be readable and clear than it is to be smart.

### Methodology

When you're getting into to writing CSS, my advice is to avoid frameworks but embrace method. In my experience, you will almost always spend more time overriding frameworks or compromising your design to fit the opinions of a framework. If you need to get a simple documentation project out the door yesterday, you may find a framework can be a great tool, but without exception I find frameworks hinder learning and discovery in CSS. IMHO, you're better off learning what pieces or patterns you're not confident implementing quickly. You may be surprised how little the frameworks are actually giving you.

As far as methodology goes, I dare not tread too deeply in these contentious waters — really, whether you elect for BEM or CUBE or OOCSS or Tailwind or SMACSS or whatever, the important thing is that you think carefully about that choice before making it. If some aspect of a methodology feels confusing, make sure you're prepared to explain that aspect with patience and empathy to any collaborators. Try to weigh methodology by its level of abstraction, the learning curve for implementation, and the additional tooling it requires.

I personally use BEM for almost all projects, for a couple of reasons:

- The overhead for learning BEM is knowing that `__` means a child of a block, `--` means a modifier of a block, and if you have more than one of each delimiter in a selector, it's time to start a new block. That's usually pretty straightforward to communicate as quickly as I just did.
- It's clear from looking at a well-named BEM block in CSS what its HTML counterpart is meant to communicate. For example, selectors for `.card` and `.card__title` and `.card__thumbnail` and `.card__thumbnail—-small` probably represent some sort of card, the card's title, and two possible states for a card image.
- At the same time as the structure is visible by the class naming, BEM CSS also doesn't care what tags are actually in use in the HTML. (_See my note about the cascade below._)
- It plays extremely well with the `&` operator in SCSS. Note that we get the visual organization of nesting without the steep specificity increase.

```scss
.card {
  &__title {
  } // .card__title
  &__thumbnail {
    // .card__thumbnail
    &--small {
    } // .card__image--small
  }
}
```

- The inherently low specificity means its easy to override, which is good for cases where you don't have complete control over markup. For instance, I often have to render some markdown as HTML inside a container. To style that new HTML, all I need to do is style the cascade one level of specificity higher:

```scss
.blog-article {
  &__title {
  }
  &__content {
    p {
    }
    blockquote {
    }
  }
}
```

### A Note On The Cascade

Candidly, I'm still navigating my relationship with the cascade. I first enjoyed BEM because it fully sidesteps the cascade and that feels simple to me. However, a lot of smart people that I know laud the benefits and misunderstood nature of the cascade; that makes me think I might be wrong about my election to minimize cascades in my CSS. If you're a few steps ahead of me and ready to love the cascade once more, I highly recommend Andy Bell's writing on [CUBE CSS](https://cube.fyi/), a methodology that balances the best of all worlds between cascade inheritance, block-scoped styling, and utility CSS.

### Mobile-first style

This is one that I think gets talked about a lot but that I rarely see folks implement devoutly, and I promise it will make your life easier for writing style code: Always style from the absolute smallest screen your content will be rendered on first, and use `@media (min-width)` queries to break to layouts that allow for more real estate as it becomes available. Bugs are fewer and further between, and debugging them feels much simpler to me since adopting this approach a few years ago.

If your design doesn’t account for mobile, that’s alright — this is a great opportunity to be creative and think about how different aspects can work on mobile. Do you absolutely need a toggleable navigation bar? Can our three column layout fit meaningfully in two columns, or one?

### Stateful CSS

Now’s also the time when you can start prebuilding some of the interactivity that will come with Javascript. Think about all the states that a given interactive element will occupy, and how much of that dynamism can be offloaded from Javascript. Can you implement all states by simply changing the class on an element? Can you manually choreograph your animations with `@keyframes`, or will you need JS to calculate FLIPs, etc? This consideration will make debugging your JS much easier when we get there.

I’m not 100% certain that I’ve said my piece about CSS as comprehensively or as clearly as I’d like to. Stay tuned, this post may evolve, or yet sequels may utter from these delving mines of content management.{.editors-note}

## Interactivity and Complex Animation with JavaScript

By this point, our website ought to be lookin’ pretty good, pretty durable, pretty handsome in a dangerous sort of way. As the fashion of the web stands, the things that make websites _feel_ really cool beyond clever screen design and good fonts tend to be in the realm of JavaScript interactivity. Tread lightly as we make our way into these woods. A little JS goes a long way and too much will ruin your project, for your users and for your own enjoyment of managing the code!

Before getting involved in earnest with JS, it's important to know the facts; _great power, great responsibility_ and all that. I highly recommend you read [@malchata](https://jlwagner.net/)'s _Responsible JavasScript_, which gives a very human-friendly and thorough framework for understanding performance and browser rendering, how you can help JavaScript do its job better, and how you can improve your users' experience with your site.

### A Note On Progressive Enhancement

I try to apply an attitude of progressive enhancement to all aspects of my work — make your project work on the most inconsistent connection, on the smallest screen, for the least able user, and build gracefully upon that foundation. That applies to your HTML, it applies to your bleeding-edge CSS, it applies now to your JavaScript.

This might make me some enemies but my enemies are dorks, so: If your site doesn't work without JavaScript, your site doesn't work. It's not hard to be careful and resourceful in your application (lol) of JavaScript, and constraint makes creativity bloom.

How can you ship fewer bytes? How can you defer some interactivity? How can you let a server handle some computation instead of making a browser do it? These are fun problems to solve, and I found the glee I got from It Just Works-style automagic heavy-duty JS libraries and frameworks, i.e. JS-first development, I started to get threefold from instead shipping projects that I knew loaded fast, and loaded on any device or connection imaginable. It's just an attitude thing IMO.

### Animation

There are a lot of animations that are too complex or unable to be triggered with CSS alone. For those complex animations, I recommend getting your hands dirty with GSAP. The version 3 API is super streamlined and feels very accessible to new and seasoned creative developers, and that support community is one of the kindest you'll discover online.

Be kind in return! Those that manage the GSAP Forums will be sainted before the decade is through!{.editors-note}

With GSAP, I typically organize my code in separate files and just bundle using Rollup or similar. I'll use a file structure something like this:

```
.
├── index.html
├── css/
└── js/
    ├── main.js
    ├── animations/
    │   ├── cardReveal.animation.js
    │   └── homepageScroll.animation.js
    └── transitions/
        ├── home.transition.js
        ├── blog.transition.js
        └── default.transition.js
```

Then if I want to do something like use an `IntersectionObserver` to reveal the cards when they arrive on the page, it's easy to do something like this:

```js
// main.js
import { CardRevealAnimation } from "./animations/cardReveal.animation";

const revealHandler = (entries, observer) => {
  entries.forEach((entry) => {
    const animation = CardRevealAnimation(entry.target);
    animation.play();
    animation.eventCallback("onComplete", animation.kill);
  });
};

const revealObserver = new IntersectionObserver(revealHandler);

[...document.querySelectorAll("[reveal]")].forEach((el) => revealObserver.observe(el));
```

### Transitions

The thing about single-page apps that seems like a killer feature for a lot of JS-first devs is page transitions. Almost nothing\* makes a site feel cooler than doing a really slick hide timeline, updating the URL, and subsequently doing a really slick reveal animation of the next page.

\*Shaders. {.editors-note}

But hark — we're in dangerous territory again. Always progressively enhance your apps, especially when you're fucking with something as browser-critical as page routing. You know as well as I do how miserable it is to be hung up between pages because the JS-powered router failed. Be very careful.

There are a lot of ways to do the partial AJAX SPA-style of routing we're talking about, but my preferred way _lately_ is [Taxi.js](https://taxi.js.org/), and I just mount GSAP timelines between pages. GSAP tends to be very powerful for this style of animation, cause oftentimes you're looking to bring an element _from_ somewhere but you don't necessarily know where, and GSAP has both `.from` or `.to` methods for seamlessly switching back and forth between known positioning and unknown positioning.

## Conclusion

I'd like to make this rant into a resource, more robust guidelines, etc. If there's something I didn't cover that you'd like to learn about, something I _did_ cover that I didn't cover well enough, or if you just think I'm wrong and stupid, please don't hesitate to hit me up [via email](mailto:yo@henry.codes) or [on Bluesky](https://bsky.app/profile/strange.website).

Candidly, I hope this hasn't felt too pedantic or peremptory. Websites are fun, the internet is a gift. It's important to remember the experience of your users is ten thousand times more important than your developer experience. Have fun, be safe, protect each other, and don't talk to cops.

### Further Reading

- [Faculty Standards](https://faculty.com/standards/best-practices) — a great set of guardrails for being safe and considerate in your web development practice. I wrote some of these, full disclosure, but most of the heavy lifting was the fantastic writing team at [Faculty](faculty.com).
- The [HTML Spec](https://html.spec.whatwg.org/)
- The [WCAG Spec](https://www.w3.org/TR/WCAG20/)
- [Responsible Javascript](https://abookapart.com/products/responsible-javascript), by Jeremy Wagner
- Andy Bell's [Be The Browser's Mentor, Not Its Micromanager](https://buildexcellentwebsit.es/)
