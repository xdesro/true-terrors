import { gsap } from 'gsap';

import { CustomEase } from 'gsap/CustomEase';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

const titleSplit = SplitText.create('.intro__title', { type: 'words' });
const introTl = gsap
  .timeline()
  .from('.intro', {
    opacity: 0,
  })
  .from('.intro__card', {
    scale: 0.7,
    opacity: 0,
    duration: 0.5,
  })
  .from(
    titleSplit.words,
    {
      duration: 0.5,
      x: '-1rem',
      autoAlpha: 0,
      stagger: 0.05,
    },
    '>-=.5'
  )
  .from(
    '.intro__subtitle span',
    {
      autoAlpha: 0,
      stagger: 0.1,
    },
    '<+=.1'
  )
  .from(
    '.intro__label',
    {
      opacity: 1,
      clipPath: 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)',
      stagger: 0.1,
      xPercent: -2,
      duration: 0.3,
    },
    '-=.3'
  );

const tocTl = gsap
  .timeline()
  .from('.toc__title, .toc__list li', {
    filter: 'blur(2px)',
    autoAlpha: 0,
    stagger: 0.1,
    x: '1rem',
    scrollTrigger: {
      trigger: '.toc',
      start: 'top bottom-=100px',
      end: 'bottom bottom-=100px',
      scrub: 0.3,
    },
  })
  .to('.toc__title, .toc__list li', {
    filter: 'blur(2px)',
    autoAlpha: 0,
    stagger: 0.1,
    x: '-1rem',
    scrollTrigger: {
      trigger: '.toc',
      start: 'top top+=100px',
      end: 'bottom top+=100px',
      scrub: true,
    },
  });

const dividerTl = [...document.querySelectorAll('hr')].map((divider) => {
  return gsap.from(divider, {
    scaleX: 0,
    '--glyph-opacity': 0,
    scrollTrigger: {
      trigger: divider,
      start: 'top bottom-=100px',
      end: 'top bottom-=300px',
      scrub: 0.5,
    },
  });
});

const chapterCounterTl = [...document.querySelectorAll('.chapter-counter')].map(
  (counter) => {
    return gsap.from(counter, {
      filter: 'blur(2px)',
      opacity: 0,
      scrollTrigger: {
        trigger: counter,
        start: 'top bottom-=100px',
        end: 'top bottom-=300px',
        scrub: 0.5,
      },
    });
  }
);

const ch1HeaderTl = gsap
  .timeline({
    scrollTrigger: {
      trigger: '.chapter-one-hero picture',
      start: 'top bottom',
      end: 'top center-=100px',
      scrub: 0.5,
      once: true,
    },
  })
  .from('.chapter-one-hero picture', {
    scale: 0.8,
  })
  .from(
    '.chapter-one-hero__title > span:first-child',
    {
      y: '1em',
      filter: 'blur(4px)',

      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
    },
    '>-=.3'
  )
  .from(
    '.chapter-one-hero__title > span:last-child',
    {
      y: '-1em',
      filter: 'blur(4px)',

      clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
    },
    '<+=.1'
  )
  .from(
    '.chapter-one-hero__title > span:nth-child(2)',
    {
      filter: 'blur(4px)',
      autoAlpha: 0,
    },
    '<+=.1'
  )
  .from(
    '.chapter-one-hero figcaption',
    {
      autoAlpha: 0,
    },
    '<'
  );

const pastoralTl = gsap
  .timeline()
  .fromTo(
    '.pastoral-aside picture',
    {
      yPercent: -10,
    },
    {
      yPercent: 10,
      scrollTrigger: {
        trigger: '.pastoral-aside picture',
        scrub: 0.5,
        start: 'top bottom',
        end: 'bottom top',
      },
    }
  )
  .from('.pastoral-aside__title', {
    filter: 'blur(4px)',
    autoAlpha: 0,
    scrollTrigger: {
      trigger: '.pastoral-aside__title',
      scrub: 0.5,
      once: true,
      start: 'top bottom-=100px',
      end: 'top bottom-=300px',
    },
  });
