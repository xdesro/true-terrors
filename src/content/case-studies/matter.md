---
title: Matter
abstract: A thrilling rebuild of the Matter marketing website, featuring a rich, animated and interactive 3D storytelling experience for the homepage.
isFeatured: true
categories:
  - web development
  - webGL
duration: September 2023—November 2023
publishDate: 2022-11-01T12:00-00:00
titleSplitIndex: 4
theme:
  fill: '#121517'
  contrast: '#fff'
---
The team at Matter approached me in their stealth phase about building a pre-launch landing page to start generating buzz and collecting a mailing list. After our initial build phase, I stayed on with Matter for a few months implementing a phase 2, which featured more content and some really cool data visualization pieces. 

For now, this study concerns the work for the pre-launch version of the site. I’ll update this when I’ve got a compelling writeup for the phase two buildout and the dataviz work.{.editors-note}

## Pre-launch: A trillion stars in the sky

In the first phase, I worked primarily with the killer product designer [Mike Barton](https://www.barton.design/) to implement his vision for a long-scroll narrative-style page. Users would scroll through a simple cryptic breakdown of Matter’s value proposition, and convert to sign up for updates as Matter entered their beta stage and eventually went live.

There was this tremendous particle animation the team had worked with a 3D designer to implement in the Matter app on-boarding, and Mike and I encouraged each other to push limits and see if we could get it working in a browser WebGL context. We would use THREE.js for most of the GL work on this project in the interest of rapid prototyping and maintainability, and use GSAP as our animation library, to keep things lightweight and easy to author and adjust.

<div class="subgrid flow" style="--standard-column: 2 / span 10;">
  <img class="column with-transparent-bg" style="--column: 1 / -1" src="https://res.cloudinary.com/henry-codes/image/upload/v1736112510/figma-comps_ljjqao.png" alt="A four-up composite of different screenshots of the Matter website in Figma. The first has an animated starfield, the second has a 3D brain element, made of particles, the third is a hexagonal, organic particle simulation, and the fourth is a call-to-action signup form with two 3D models of iPhones with app screenshots on them" />
</div>

I found this two be three distinct challenges. The first: to convert the 3D geometry of each 3D model into a points system, secondly, the creation of a semi-organic hexagonal particle simulator, and the third: tying it all together in a clean scrolling animation.

## Geometry into particles

I converted the `.OBJ` models of the globe, brain, and molecules into [`gl.POINTS`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawElements#mode), and then built scenes for each phase of the narrative to keep things modular. The stars animation at the start is also `gl.POINTS`, but is procedurally-generated, instead of loaded from a `.OBJ` file. With lyrical, experiential design like this, it’s a good idea to stay loose. Expecting the project to look the same at its advent as it does at its launch enables bad habits of writing code inflexibly, and that in turn makes us resistant to new ideas. I keep it in small modular chunks, so when we want to try something totally wild and new, it doesn’t eat my whole day refactoring. 


<img class="flow" style="--standard-column: 4 / span 7;" alt="An animated GIF of the Matter landing page, showing the text “We’re all just stardust” superimposed on a zooming field of stars." src="https://res.cloudinary.com/henry-codes/image/upload/v1736112966/CleanShot_2025-01-05_at_14.34.58_myhnhd.gif" eleventy:ignore />
<img class="flow" style="--standard-column: 3 / span 7;" alt="An animated GIF of the Matter landing page, featuring a 3D model of a brain, rendered in particles, rotating slowly about its Y axis." src="https://res.cloudinary.com/henry-codes/image/upload/v1736113373/CleanShot_2025-01-05_at_14.40.18_xcl9tl.gif" eleventy:ignore />

##  Integrating a particle simulator engine

![A screenshot of the Matter website featuring a hexagon-shaped particle simulation scrimmed behind some text about neurotransmitters.](https://res.cloudinary.com/henry-codes/image/upload/v1736113485/CleanShot_2025-01-05_at_14.44.36_2x_os2rw9.png)

In rendering the hexagonal particle animation, I knew we’d have to do quite a lot of graphical work:
- Particles must spawn along a given hexagonal path
- Particles are hazy in appearance
- Particles are emitted semi-randomly
- Particles are a random size between a given range
- Particles change direction and velocity over time organically,
- Particles change size and opacity over their lifespan to give that heatmap effect
- Particles blend when they overlap other particles

The graphical complexity (size and blurred edges) meant `gl.POINTS` wouldn’t do for this application, so I turned to a shader-based particle engine in order to create controllable emitters, which would in turn emit controllable particles that operated organically within constraints I created. 

The procedural nature of the engine meant it wasn’t possible to bind positions to scroll the way I could with the 3D models *(imagine trying to update the lifecycle position of literally 12,000 particles, 60+ times a second)*, so we elected to have the emitter enabled and disabled depending on scroll position — if the user scrolled past the particle simulation, no new particles would be emitted, and the existing particles would die their natural deaths.

<video autoplay muted loop playsinline loading="lazy">
  <source src="https://res.cloudinary.com/henry-codes/video/upload/v1736113850/CleanShot_2025-01-05_at_14.50.39_dy2up9.mov"></source>
  <p>An animation of the particle simulator described. Many small, blurred spore-like dots appear in a hexagonal pattern, and gently drift out to the edges of the frame, fading from light blue to purple to red.</p>
</video>
<!-- %% TODO Tiny implementation of particle simulator? %% -->

## Scrolling and other animations

I mounted each scene on a GSAP timeline, so it would be easy and readable to mount other parts of the page changing, such as the fading-in and -out of text, or adjusting the speed of different simulations. 

<img class="flow" style="--standard-column: 4 / span 7;" alt="" src="https://res.cloudinary.com/henry-codes/image/upload/v1736114542/CleanShot_2025-01-05_at_15.00.37_jgnikw.gif" eleventy:ignore />

I also created some lovely minor interactions for forms, etc. throughout the project, to give it that polished and considered feel, that coveted _je ne sais quoi_.

<img class="flow" alt="A button reading 'Join the beta', which fluidly expands into a sign-up form when clicked." src="https://res.cloudinary.com/henry-codes/image/upload/v1736114768/CleanShot_2025-01-05_at_15.05.27_wfmfs9.gif" eleventy:ignore />

## Conclusion 

A few months after this successful launch, Matter brought their app to the general public, and we started a second phase of work to expanding the site to a more useful source of content, marketing materials, and scientific whitepapers.

### A note on best practices and progressive enhancement

As with as many of my projects as possible, this project uses accessible HTML markup and observes the user’s `prefers-reduced-motion` preference, as well as being fully progressively-enhanced: if JavaScript never loads, the page still works perfectly well in a slightly less theatrical form. Users never wait for a large JS payload, and they never have to look at a loader. 
