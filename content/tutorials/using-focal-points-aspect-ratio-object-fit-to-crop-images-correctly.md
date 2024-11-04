---
title: Using Focal Points, Aspect Ratio & Object-Fit To Crop Images Correctly
slug: pure-css-focal-points
heroImage: ./img/35A.Using Focal Points, Aspect Ratio and Object-Fit To Crop Images Correctly.png
excerpt: CSS has a lot of pretty rad and powerful features for managing image rendering these days. Let’s leverage some of these, like aspect-ratio, object-fit, and object-position for when we need to use a single image in many different contexts.
publishDate: 2023-02-18T22:27-05:00
socialSharingImage: ./img/35A.Using Focal Points, Aspect Ratio and Object-Fit To Crop Images Correctly.png
templateEngineOverride: md
category: tutorial
topics: [css, css variables, aspect-ratio, object-fit]
toc:
  - { title: Choosing A Focal Point, url: "#choosing-a-focal-point" }
  - { title: Using Aspect-Ratio To Size Images, url: "#using-aspect-ratio-to-size-images" }
  - {
      title: Using The Focal Point In Image Positioning,
      url: "#using-the-focal-point-in-image-positioning",
    }
  - { title: Conclusion, url: "#conclusion" }
---

Before I even get into the impetus for this blog post, if you came from a search engine and you just want the code, [here’s a demo](https://codepen.io/xdesro/pen/bGxVorV). Pleasure doing business with you.

### Introduction

In a client’s project recently, I found that their Wordpress setup required content editors to upload four separate versions of a blog post's featured image at varying dimensions to ensure a correct appearance in the many contexts that the post will be displayed in (i.e. homepage feature, blog list item, blog post page, social media sharing). Most of these images were getting created with the crop tool in GIMP or Photoshop, and not every content editor felt empowered to create all these images, so publishing timelines were getting pushed back waiting for the images to be generated. This is the sort of thing we can solve with modern CSS, so let’s do it! Don’t touch that dial!

## Choosing A Focal Point

There are many solutions for implementing a focal point selector on images in Wordpress (other content management systems are available), but for the purposes of this tutorial, we’ll create an imitation focal point picker that uses client-side JavaScript to imitate what a back-end tool might do.

Because this part isn’t useful beyond this tutorial, I’ll breeze through so we can get to the actual CSS Tricks (other web development blogs are available).

<abbr title="Too long, didn’t read">TL;DR</abbr>, we'll display our image in HTML, listen for click events on that image, and use the position of each click to set a `--focus-x` and `--focus-y` CSS variable on the `:root` of the page. In a product implementation of this, it'd be better to be more specific and set those CSS variables somewhere that "focus-x" makes more sense, but since we're using the same image many times on this page, `document.documentElement` is okay.

```html
<img
  class="source-image"
  src="https://images.unsplash.com/photo-1676486694880-230d58890871?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"
/>
```

```js
const sourceImage = document.querySelector(".source-image");
sourceImage.addEventListener("click", (event) => {
  const rect = event.target.getBoundingClientRect();
  const xCoord = event.clientX - rect.left;
  const yCoord = event.clientY - rect.top;

const xAsPercentage = (xCoord / rect.width) _ 100;
const yAsPercentage = (yCoord / rect.height) _ 100;

document.documentElement.style.setProperty("--focus-x", `${xAsPercentage}%`);
document.documentElement.style.setProperty("--focus-y", `${yAsPercentage}%`);
});
```

Now, clicking the source image should give us some output like:

```html
<html style="--focus-x:64.2862%; --focus-y:35.5263%;"></html>
```

## Using Aspect-Ratio To Size Images

Now let's create a few example images that can represent those use cases we described at the start. We'll imagine we have three potential use cases for this image:

- A wide landscape homepage hero, 16:9 dimensions in the design file we've been given
- A square thumbnail for a blog list item
- A 3:4 portrait view for each individual blog post page

We'll write some HTML for these examples:

```html
<article class="homepage-hero">
  <img src="the same URL as the one before lol" />
</article>

<article class="blog-list-item">
  <img src="..." />
</article>

<article class="blog-post">
  <img src="..." />
</article>
```

Now, some accompanying CSS. We'll first use a property called [`aspect-ratio`](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio), which takes an aspect-ratio expressed fraction or decimal.

```css
article > img {
  aspect-ratio: var(--aspect-ratio);
}
.homepage-hero {
  --aspect-ratio: 16 / 9;
}
.blog-list-item {
  --aspect-ratio: 1 / 1;
}
.blog-post {
  --aspect-ratio: 3 / 4;
}
```

![Three identical images side by side, rendered with varying aspect ratios. Each image is distorted in some way.](./img/wyv.CleanShot 2023-02-18 at 22.31.19@2x.png)

This is doing _something_, but our images are a little squished. That's where `object-fit` comes in. We can use `object-fit` similarly to `background-position`, setting it to `contain` or `cover` to keep it from stretching. The default value is `fill`, which will always stretch an image in any direction it needs to in order to fit the rendered aspect ratio of the image. We'll use `object-fit: cover;` because we always want images to completely _cover_ their rendered aspect ratio, we just don't want the deformation.

```css
article > img {
  aspect-ratio: var(--aspect-ratio);
  object-fit: cover;
}
```

![Three identical images, as before with varying aspect ratios, but now each is sized correctly within its bounds. The flowers in each image are displayed at a different spot in the image though.](./img/3aQ.CleanShot 2023-02-18 at 22.36.26@2x.png)

The images are looking a lot better now, but hark: in some of the images, the subject of the image is cropped out strangely. Let's sort that.

## Using The Focal Point In Image Positioning

Now we can use `object-position` (similar to `background-position`) to move the image until the thing we've decided is most important is in frame.

```css
article > img {
  aspect-ratio: var(--aspect-ratio);
  object-fit: cover;
  object-position: var(--focus-x) var(--focus-y);
}
```

![The three images now rendered perfectly, showing the subject matter flower bouquet centered in every arbitrary aspect ratio the image is displayed at.](./img/YPf.CleanShot 2023-02-18 at 22.45.48@2x.png)

That's more like it. There’s a problem that used to take a couple minutes per post in an image editor, more-or-less solved with fifteen lines of CSS. Golly gosh is it a good day to be working on the web.

### Possible Improvements

You'll find in some cases that setting a focal point in the corner or edge of an image doesn't work perfectly — the selected point will always be in the image but it won't always be centered in the image. I briefly tried to work out how this could be solved with exactly our markup and existing CSS, but I think there's more to it. By my estimate, roughly what would need to happen is:

1. Wrap the image in a `<div>` with the same `aspect-ratio` value as the image, and make sure its overflow is hidden.
2. Figure out how far the focal point is from the center of the rendered image container.
3. Translate the `<img>` by that distance so that the focal point is in the center.
4. Additionally, scale the `<img>` by whatever factor is necessary fo ensure it still covers its parent. (I think the math would be something like: if you translate the image left 10%, you'll need to scale the image to 120% in order to account for that movement.)

## Conclusion

Anyway thanks for reading. As always, feel free to [shoot me an email](mailto:yo@henry.codes) if you have further questions, need to make a correction, or think my cool hat is stupid. I'm also [on Mastodon](https://front-end.social/@henry). CSS is sick, skate fast, have a blast.

### Further Reading

- [`aspect-ratio` on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio)
- [`object-fit` on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)
- [`object-position` on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position)
- And [here’s that CodePen demo](https://codepen.io/xdesro/pen/bGxVorV) one more time.
