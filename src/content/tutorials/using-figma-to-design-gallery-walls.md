---
title: Using Figma to design perfect gallery walls
slug: using-figma-to-design-gallery-walls
heroImage: https://res.cloudinary.com/henry-codes/image/upload/v1739910453/DSCF9710_oenpul.jpg
customThreshold: 138
useHero: true
excerpt: I'm a twisted animal with a penchant for moving every two years, and the universal upside of moving every two years, as everyone will agree, is hanging new gallery walls. Here’s a guide for how I use Figma to make the process super simple.
publishDate: 2025-02-21T18:50:52.557Z
tags:
  - article
category: tutorial
topics:
  - design
  - figma
  - irl
---

Quick heads up: Since writing this, I’ve found one or two fairly sizeable bugs in the Galleria plugin. I’ve published anyway cause the guide is not entirely dependent on Galleria, and Galleria is _mostly_ functional. You can still give it a shot, or alternately use Photoshop’s Perspective Warp tool, or come back soon and I should have it worked out :) _(cir. Feb 21 2025)_ {.under-construction}

I'm a twisted animal with a penchant for moving every two years, and the universal upside of moving every two years, as everyone will agree, is hanging new gallery walls. The rectangle enjoyer in me started using Figma to design them a few years ago; the upside is I can draft a bunch of ideas without taking up room on the living room floor, and can re-use the assets created year after year on new walls at new apartments. It even has the added bonus of becoming a little archive of past walls. It’s nice, and you can too.

<div class="subgrid flow two-col" style="--standard-column: 2 / span 10;">
    <img src="https://res.cloudinary.com/henry-codes/image/upload/v1740071737/gallery-wall-complete-comp_avfa88.jpg" alt="A gallery wall designed in Figma, featuring framed images of different sizes aligned in an organic sort of mosaic configuration." />
    <img src="https://res.cloudinary.com/henry-codes/image/upload/v1740071746/gallery-wall-complete-irl_orgzf1.jpg"  alt="The same gallery wall as in the previous image, this time implemented in a real-life wall over an acacia wood bedframe with olive and natural colored linen bedspread." />
</div>

The tools you’ll need for this are:

- A tape measure
- Phone or other camera
- Figma


Bro I realized about 4 seconds into writing this that <abbr title="in real life">IRL</abbr> _frames_ and Figma _frames_ are really hard to refer to distinctly in writing — if any of this is confusing shoot me an email or [complain on Bluesky]({{ 'bluesky' | getSocialUrl(social) }}) and I'll get you sorted.{.editors-note}

## Gathering and treating assets

The first thing that needs done is to photograph the pieces that'll be going into the wall. I try to always shoot new additions in the same context and light. You want to avoid glare but most everything else can be fixed with a Figma plugin we’re gonna grab in the next step. It doesn’t even particularly matter how far or at what angle you take the photo, but in general:

- _Take a photo of the entire framed image._ The frame is part of the visual effect of the gallery wall so it's important to include it, not just the artwork it contains.
- _Leave a few inches around each frame_, both to avoid lens distortion and so you have some room to crop in.
- _Try to shoot mostly straight on._ Doesn’t need to be perfect by any means but a little effort to square things up a bit before we manually square them wouldn't be a bad thing.

![A group of 5 photographs of framed art prints in a Finder window.](https://res.cloudinary.com/henry-codes/image/upload/v1740159634/CleanShot_2025-02-21_at_10.40.25_2x_px0rfm.png)

### Correcting perspective using the _Galleria_ plugin

Next we'll use a Figma plugin I made _(crowd slamming hands on tables, chanting “shill! shill! shill!”)_ to make sure the perspective of our images is perfectly square for planning and mockup purposes. You can install and run the plugin from Figma Community:

{% renderTemplate 'webc' %}

<embed-card :external="true" title="Galleria - Perspective Warp Tool" url="https://www.figma.com/community/plugin/1472344805958514303/galleria-perspective-warp-tool" author="Henry (From Online)" :show-url="false">
A Figma plugin for correcting or warping the perspective of image fills in your Figma document.

</embed-card>

{% endrenderTemplate %}

I've already written a detailed guide on how to use the plugin elsewhere on my blog, so if the onboard UI isn't clear, you can head over there to get situated!

{% renderTemplate 'webc', { collectionsAll: collections.all } %}

<embed-card :post="findPostByPath(collectionsAll, 'writing/correcting-perspective-in-figma-images-with-the-galleria-plugin/')"></embed-card>

{% endrenderTemplate %}

I based the functionality of this plugin off Photoshop’s Perspective Warp tool, so if you’ve got Photoshop and don't wanna touch my garbage that's a super strong alternative.{.editors-note}

I try to stick to an assembly-line style of work, taking all of the photos at once, adding them all to Figma at once, correcting all their perspectives in a batch, etc. For each framed image, we'll import it to Figma and use _Galleria_ correct the perspective. Then we'll crop the output to only the framed image, and paste it into the Figma canvas.

<div class="column flow" style="--standard-column: 3 / span 8;">
    <img class="with-transparent-bg" alt="A set of five photographs of framed images first before any image treatment, and then again cropped and perspective-corrected." src="https://res.cloudinary.com/henry-codes/image/upload/v1740160540/figma-before-after-warp_m7b69r.png" />
</div>

## Mapping IRL measurements into Figma

Now we can collect the measurements of all of our frames and implement them in Figma. The way we'll do this is by giving a real life unit a Figma canvas pixel equivalent. I typically map 1cm to 10px. Centimeters are more accurate than inches, and putting a 0 on the end of every number makes everything feel quite tidy.

For each framed image, we'll grab the width and height of the IRL frame in centimeters and set the corresponding Figma frame to that `cm` measurement times ten. For example, if one of my posters is 54cm x 70cm, I'll set its proxy in Figma to 540px x 700px. It's important to work out an easy-to-remember measurement translation system so you can easily add new walls and new frames in the future.

<div class="subgrid flow two-col" style="--standard-column: 2 / span 10;">
    <img src="https://res.cloudinary.com/henry-codes/image/upload/v1740161463/CleanShot_2025-02-21_at_11.07.59_nx9mvz.png" alt="A framed art print of Saint Sebastian being measured by the author with a tape measure. The overlaid text shows that the image is 29 by 37 centimeters." />
    <img src="https://res.cloudinary.com/henry-codes/image/upload/v1740161434/CleanShot_2025-02-21_at_11.07.11_2x_juy3fh.png"  alt="The same image, now ported into Figma, showing its dimensions as 290 by 370 pixels, exactly 10 times the centimeter amount of the real-life unit." />
</div>


### A quick note about Figma components

I recommend you use the Figma Create Component feature on each frame once you’ve got it warped, cropped, and resized. That way you can easily re-use it without worry of mutating the original.

## Planning out walls

Now that we have all of our frames imported, we can start trying out ideas. If I've got a wall space I'm designing for, I typically like to measure the entire wall and create it as a rectangle in Figma, even measuring out obstacles like doors or furniture so I can get an idea of the complete visual effect. Our translation system comes in handy again here: If my wall is 13ft long and 9ft high, I can convert that easily to 394cm x 274cm, and create a corresponding Figma "wall" rectangle of `3940px x 2740px`. Now my framed _images_ will always by perfectly sized to the walls they'll be mocking up.

### Complex wall shapes

If you want your mockup to respond to wall configurations more complicated than a perfectly-rectangular wall, you can make use of the Figma boolean operations. For example, if your wall is interrupted by a door, you can measure the size of the door and its distance from the closest wall, and then create a rectangle of the corresponding size and distance on top of the wall you've already created. Select both the door and the wall, and go to `Object → Boolean Groups → Subtract selection`. Now your wall shape will be match the wall you have to work with in real life.

<div class="column flow" style="--standard-column: 2 / span 10;">
    <img alt="A Figma diagram showing two superimposed rectangles, meant to indicate the size of the wall, and the position of a door on the wall. Next to the diagram is the same shape, re-created as one shape using Figma boolean composite operations." src="https://res.cloudinary.com/henry-codes/image/upload/v1740161809/CleanShot_2025-02-21_at_11.16.38_2x_xo4yqr.png">
</div>

## Conclusion and potential enhancements

And that’s my system. It's nice to be able to try out 30 versions of one layout before committing to putting nails in the wall. I've been using this method for years, refining my approach each time.

<div class="subgrid flow two-col" style="--standard-column: 2 / span 10;">
    <img src="https://res.cloudinary.com/henry-codes/image/upload/v1740072622/gallery-wall-complete-comp-2_bmnpwn.jpg" alt="A gallery wall designed in Figma, featuring framed images of different sizes aligned in an organic sort of mosaic configuration." />
    <img src="https://res.cloudinary.com/henry-codes/image/upload/v1740072624/gallery-wall-complete-irl-2_f4msyo.jpg"  alt="The same gallery wall as in the previous image, this time implemented in a real-life wall over a TV on tripod stand, with a sofa and a glass coffee table visible" />
</div>

This is the most basic implementation, but there's a ton you can do to enhance the simulation and implementation of the wall:

### Mocking up the actual wall

I usually take a picture of the wall I'm actually mocking up and perspective warp it the same way I do everything else, and then I can add it as a fill layer to the wall rectangle I'm laying out on. It adds just that much to the simulation to have actual wall texture or overlapping furniture visible.

<div class="column flow" style="--standard-column: 3 / span 8;">
    <img alt="Two Figma comps of the same gallery wall design. In the first, the background is a plain white field. In the second, the author has included a real life photograph of the wall the frames will be hung on." src="https://res.cloudinary.com/henry-codes/image/upload/v1740163590/CleanShot_2025-02-21_at_11.46.19_2x_i89hsk.png">
</div>

### Documenting wall mounting points

If you wanted to get really twisted with it, you could create diagrams of where you need to create mounting holes from this. I haven't actually done this _yet_, but the way I envision it would work is that you could create multi-layered components out of each frame. One layer would have the photograph of your image, and on a second layer you would create a diagram of where on the back of the frame the mounting hooks/rails/etc are.

As always, if you’ve found any issues with any of this, the blog post or the process itself, feel free to [shoot me an email](mailto:yo@henry.codes?subject=You%20Fool.%20You%20Absolute%20Goombus.%20What%20Were%20You%20Thinking.) or [get at me on Bluesky]({{ 'bluesky' | getSocialUrl(social) }}).
