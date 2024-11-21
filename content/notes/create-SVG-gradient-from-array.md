---
title: "Create an SVG gradient from an array of colors"
drafted: true
topics:
  - code snippet
  - svg
date: 2021-10-13T06:00:00.000Z
---

Alright this isn't actually usable yet, I created this for a [specific side project](https://reading.henry.codes) and have yet to sanitize it for reusability in new contexts.{.under-construction}

If you’ve a random list of colors and you want a perfect gradient between them, here’s how. I’ve got it in Vue here but I'll add templating for like Nunjucks or Liquid down the line.

This uses the `mapRange` linear interpolation function I talk about in [this post](/writing/how-to-map-a-number-between-two-ranges/#tl-dr).

In Vue single-file components:

```html
<template>
  <svg>
    <defs>
      <linearGradient id="fill-mask" x1="0" y1="0" x2="100%" y2="0">
        <stop
          v-for="(color, index) in colors"
          :stop-color="color"
          :offset="mapRange(index, 0, colors.length, 0, 1)"
          :key="index"
        />
      </linearGradient>
    </defs>
    <rect
      mask="url(#rating-percentage-shape-mask)"
      fill="url(#fill-mask)"
      width="100%"
      height="100%"
      x="0"
      y="0"
    />
  </svg>
</template>
```
