import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

import { getCelestialBodiesPaths } from '../utils';

gsap.registerPlugin(ScrollTrigger);

let { moonPath, sunPath } = getCelestialBodiesPaths();

export default () =>
  gsap
    .timeline({
      scrollTrigger: {
        trigger: '.article-content p:first-child',
        start: 'top bottom',
        end: 'center center',
        scrub: 1,
        fastScrollEnd: true,
      },
    })
    .to(
      '.hero',
      {
        color: '#030303',
        filter: 'blur(4px)',
        opacity: 0,
      },
      '<',
    )
    .from(
      '.article-content',
      {
        opacity: 0,
      },
      '<',
    )
    .fromTo(
      '.clock',
      { opacity: 0 },
      {
        opacity: 1,
      },
      '<',
    )
    .to(
      '.moon',
      {
        motionPath: {
          path: moonPath,
        },
        ease: 'Power4.inOut',
      },
      '<',
    )
    .to(
      '.sun',
      {
        motionPath: {
          path: sunPath,
          alignOrigin: [0.5, 0.5],
        },
        ease: 'Power4.inOut',
      },
      '<',
    );
