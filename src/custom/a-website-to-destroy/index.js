import { gsap } from 'gsap';

import { CustomEase } from 'gsap/CustomEase';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

const introTl = gsap.timeline();
const titleSplit = SplitText.create('.intro__title', { type: 'words' });

introTl
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
    '>-=.2'
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
      stagger: '.1',
      duration: 0.3,
    },
    '-=.3'
  );
