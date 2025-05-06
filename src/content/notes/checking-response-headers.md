---
title: 'Quickly checking HTTP response headers'
drafted: false
topics:
  - code snippet
  - http
publishDate: 2025-05-06T12:41:00.689Z
---

Fastest cleanest way if you're a Terminal Enjoyer™ is with `curl`:

```sh
curl -I https://henry.codes/
```

But if you prefer using a browser dev inspector, you can go `Inspector > Network > HTML > [the current page]` and scroll to Response Headers.

![A screenshot of a browser window as described, requesting the homepage of henry.codes and revealing its relevant HTTP headers in the right-side inspector panel.](https://res.cloudinary.com/henry-codes/image/upload/v1746557143/CleanShot_2025-05-06_at_12.43.59_2x_htycso.png)
