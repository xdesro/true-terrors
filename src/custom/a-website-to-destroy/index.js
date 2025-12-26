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
