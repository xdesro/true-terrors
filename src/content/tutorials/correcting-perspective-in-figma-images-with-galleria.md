---
title: Correcting perspective in Figma images with the Galleria plugin
abstract: Here’s a basic guide to using my Figma plugin to correct planar perspective warp in images.
publishDate: 2025-02-17T18:20:02.974Z
heroImage: https://res.cloudinary.com/henry-codes/image/upload/v1739824201/frames_ejugp2.jpg
customThreshold: 190
useHero: true
tags:
  - article
category: resource
topics:
  - figma
  - figma plugins
---

Whether it’s a framed image that was taken at a slight angle, or a product photo that just doesn't quite match the rest in the grid, I’ve frequently had the need to adjust the perspective of an image in my design work. In the past I’ve just used the Perspective Warp tool in Photoshop, but it felt silly to boot up a whole separate graphics program for a two-second adjustment, so I made _Galleria_, a Figma plugin which lets you do exactly this.

![A screenshot of the Figma Community page for the author’s 'Galleria' plugin.](https://res.cloudinary.com/henry-codes/image/upload/v1739895962/CleanShot_2025-02-18_at_09.25.52_2x_metbqv.png)

## Installation

_Galleria_ is part of the Figma plugin community, so you can look it up in the app via `Plugins → Manage plugins` and search "Galleria", or just download it directly from the community:

{% renderTemplate 'webc' %}

<embed-card :external="true" title="Galleria - Perspective Warp Tool" url="https://www.figma.com/community/plugin/1472344805958514303/galleria-perspective-warp-tool" author="Henry From Online" :show-url="false">

A Figma plugin for correcting or warping the perspective of image fills in your Figma document.

</embed-card>

{% endrenderTemplate %}

## A new perspective

To get started with _Galleria_, you can select any frame or rectangle that has an image fill, and then run the plugin by right-clicking → plugins → _Galleria_. A window will open with the image fill rendered twice, once as it currently is and also how it will be once you sort out the perspective.

<div class="flow" style="--standard-column: 3 / span 8">
  <img src="https://res.cloudinary.com/henry-codes/image/upload/v1739895177/CleanShot_2025-02-18_at_09.12.45_2x_gss6da.png" alt="The user interface, entitled Galleria as described above." />
<!-- ![The user interface, entitled Galleria as described above.](https://res.cloudinary.com/henry-codes/image/upload/v1739895177/CleanShot_2025-02-18_at_09.12.45_2x_gss6da.png) -->
</div>

### Selecting a perspective plane

You can drag the corners of the quadrilateral on the left image to select the corners of a plane in the image that is meant to be perfectly rectangular. As you adjust the plane selection, you'll see the image get warped on the right side. Once you've matched up the points, the image on the right should have its perspective corrected.

Sometimes, it doesn’t work perfectly lol. As far as I can tell it’s mostly when an image has excessive lens distortion in addition to angular distortion, but if you find additional bugs please [don’t hesitate to let me know](mailto:yo+figma@henry.codes?subject=Issues%20with%20Galleria).{.editors-note}

<div class="flow" style="--standard-column: 3 / span 8">
  <img class="with-transparent-bg" src="https://res.cloudinary.com/henry-codes/image/upload/v1739895850/galleria-warped-frames_2_yoj2f5.png" alt="Three warped versions of the originally uploaded framed image of some snakes." />
</div>

### Selecting an output frame

Now that the perspective is corrected, you can choose one of the export options, to put the entire result back into your Figma document, but since the result is a bizarre shape this probably isn’t what you want. If you want to crop the result, you can click-and-drag a shape in the second window to choose a preferred area.

<div class="flow" style="--standard-column: 3 / span 8">
  <img src="https://res.cloudinary.com/henry-codes/image/upload/v1739895960/CleanShot_2025-02-18_at_09.25.36_2x_qt945c.png" alt="The original image of a framed art print of some snakes, side-by-side on a Figma canvas with a cropped, perspective-corrected version of the same image." />
</div>

## And it’s as simple as that

And folks, it’s as simple as that. Like I mentioned before, if you find any images that fail, [feel free to shoot me an email](mailto:yo+figma@henry.codes?subject=Issues%20with%20Galleria) and I'll do my best to get a fix in place. I use this tooling primarily to square up photographs of framed images in order to plan gallery walls in Figma, but if you have a unique use case, I'd love to hear about that too. Further questions comments concerns generational curses are welcome in my email inbox or you can yell at me [on Bluesky]({{ 'bluesky' | getSocialUrl(social) }}).
