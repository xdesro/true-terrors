---
title: Ricky Michiels Casting
abstract: A clean and compelling redesign of a premier casting director and modeling agent’s site.
isFeatured: true
categories:
  - web design
  - web development
duration: April 2022
publishDate: 2022-04-01T12:00-00:00
titleSplitIndex: 7
theme:
  fill: '#2E2A2B'
  contrast: '#F9F9F9'
---

I’ve had the opportunity to work with Ricky Michiels on web projects a few times now, so when he approached me in October 2021 to redesign and rebuilt the website for his casting and modeling agency, I was completely thrilled. We have similar tastes in and appreciation for experiential web, and after a few conversations about what was working for his current site and what wasn’t working, we were able to dive into design right away.

## Design explorations & iteration

I cooked up some wireframes in Figma to get an idea of how each page ought to work, and we talked out interaction patterns, information architecture, and content via email. As most of the site is meant to lend legitimacy to the RM brand and drive folks to contact him about signing or being signed, we could focus on highlighting a wealth of editorial photography from models and castings.

<div class="subgrid flow" style="--standard-column: 2 / span 10;">
  <img class="column with-transparent-bg with-soft-filter-outline" style="--column: 1 / -1" src="https://res.cloudinary.com/henry-codes/image/upload/v1736135343/figma-wireframes_ov990u.png" alt="A four-up composite of different layouts from the Ricky Michiels project in Figma, showing them without typography choices and with placeholder images. These communicate the rough idea of a casting, agency, and about page, with individual pages for each model and casting case study." />
</div>

Once the general skeleton was locked in, I moved into higher-fidelity explorations. Two of the really enjoyable parts of any project with Ricky is his interest in design and the flexibility of his brand expression, so we were able to try a ton of layout and typographic variations until we found something he’d be quite happy with. Ultimately we let type take a back seat, making more conservative choices to let his incredible photography speak unencumbered.

<div class="subgrid flow" style="--standard-column: 2 / span 5;">
  <img class="column with-soft-outline with-curved-border" src="https://res.cloudinary.com/henry-codes/image/upload/v1736135342/casting-page_a1mr6u.jpg" alt="" />
</div>
<div class="subgrid flow" style="--standard-column: auto / span 5">
  <img class="column with-soft-outline with-curved-border" src="https://res.cloudinary.com/henry-codes/image/upload/v1736135343/agency-page_lakqvo.jpg" alt="" />
</div>

I designed gallery pages for both the casting and model agency practices, which would allow both for recent or especially striking work to feature, as well as provide a directory of all related content, be it individual model listing pages or casting case studies.

<div class="subgrid flow" style="--standard-column: 2 / span 5;">
 <img class="column with-soft-outline with-curved-border" src="https://res.cloudinary.com/henry-codes/image/upload/v1736136010/casting-project-page_zpbazv.jpg" alt="" />
</div>
<div class="subgrid flow" style="--standard-column: auto / span 5">
 <img class="column with-soft-outline with-curved-border" src="https://res.cloudinary.com/henry-codes/image/upload/v1736135343/agency-model-page_mgkxco.jpg" alt="" />
</div>

## Development highlights

I built a headless CMS backend in Contentful for Ricky to enter his content, with the twin-pronged upside of being *extremely* configurable, and also being modular enough that, should Ricky ever decide to redesign again ([as he recently has](https://www.rickymichiels.com/)), he doesn’t have to start from zero entering content in a new database. We did handoff completely remotely, using Loom to crash course how to create new models, new casting projects, etc. I designed the content model to be rigid enough that it didn’t feel like re-inventing the wheel to add a new project, but light and flexible enough that it was both very rapid to create and enter content, as well as to not constrain content unnecessarily. 

One example of that flexibility was in creating metadata for models or casting projects. Not every project has a photographer or stylist, and some projects need unique credits. I configured the content model to allow for any combination of roles and credits. Same goes for the model pages — not all models have a relevant waist size, or an instagram, etc.

<!-- TODO Recap without blue Figma outline -->
<div class="subgrid flow" style="--standard-column: 2 / span 7;">
  <img class="column with-soft-outline with-curved-border" src="https://res.cloudinary.com/henry-codes/image/upload/v1736135343/casting-page-highlight_dmpnze.png" alt="" />
</div>
<div class="subgrid flow" style="--standard-column: auto / span 3;">
  <img class="column with-soft-outline with-curved-border" src="https://res.cloudinary.com/henry-codes/image/upload/v1736135343/casting-list-highlight_gbjewk.png" alt="" />
</div>


### That indescribable feeling we get when the lights begin to dim

I built a number of subtle and unsubtle movements and interactions throughout the site, to lock in that feeling of expense and completeness. Scrolling parallaxes for the model grids, animated navigation with an interlocking feel, and SPA-style route transitions helped straighten the tie of this project for its bulletproof runway reveal.

<!-- TODO Re-record this without margin and cleanshot overlay lol -->
<video class="flow with-soft-outline" autoplay muted playsinline loop>
  <source src="https://res.cloudinary.com/henry-codes/video/upload/v1736135343/parallax-headshots_hheqen.mp4" type="video/mp4">
</video>



<img class="flow with-soft-outline"  style="--standard-column: 2 / span 5;" src="https://res.cloudinary.com/henry-codes/image/upload/v1736135344/nav-rotation_fq7siz.gif" alt="" eleventy:ignore>

<video class="flow with-soft-outline"  style="--standard-column: auto / span 5;"  autoplay muted playsinline loop>
  <source src="https://res.cloudinary.com/henry-codes/video/upload/v1736135343/page-transitions_piboo1.mp4" type="video/mp4">
</video>

## Retrospective

I’m really proud of this now-archived project: this was an exemplary collaboration, where both parties were clear about expectations and limitations, and we ended up with a result we were both happy with for its lifespan. Ricky Michiels' work is exclusive and unmistakeable, and I was glad to deliver a project that met his standards and the standards of his practice.

<img class="with-soft-outline with-curved-border" src="https://res.cloudinary.com/henry-codes/image/upload/v1736137606/CleanShot_2025-01-05_at_21.25.24_snivdy.gif" alt="" eleventy:ignore />