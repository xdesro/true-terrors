import gsap from 'gsap';

import MatchMediaManager from '../MatchMediaManager';
import { DefaultFadeIn } from './Fade';

export const WorkEnterTransition = (transitioningView, mediaQueries) => {
  const { prefersReducedMotion } = mediaQueries;
  const enterTl = gsap.timeline();
  if (prefersReducedMotion) {
    return DefaultFadeIn(transitioningView);
  } else {
    const title = transitioningView.querySelector('.page-header__title');
    Splitting({ target: title, by: 'chars' });
    enterTl
      .set('.page-header__title .char', {
        display: 'inline-block',
      })
      .from(
        '.page-header__title .char',
        {
          y: '100%',
          clipPath: 'polygon(0% 0%, 140% 0%, 140% 0%, 0% 0%)',
          stagger: {
            each: 0.02,
          },
          opacity: 0,
          duration: 1,
          ease: 'power4.inOut',
          // onComplete: done
        },
        '<'
      )
      .from(
        '.page-header__bar',
        {
          //   scaleX: 0,
          // x: "-10%",
          opacity: 0,
          duration: 0.3,
        },
        '>-=.5'
      )
      .from(
        '.case-study-block',
        {
          opacity: 0,
          x: -10,
          stagger: 0.1,
        },
        '>'
      )
      .from(
        '.list-design-element',
        {
          opacity: 0,
          stagger: 0.1,
        },
        '<'
      );
  }
};

export const WorkExitTransition = (transitioningView) => {
  const title = transitioningView.querySelector('.page-header__title');
  if (title && !title.classList.contains('splitting')) {
    Splitting({ target: title, by: 'chars' });
  }
  const exitTl = gsap.timeline();
  exitTl
    .set('.page-header__title .char', {
      display: 'inline-block',
    })
    .to(
      '.page-header__title .char',
      {
        y: '-100%',
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
        stagger: {
          each: 0.02,
        },
        opacity: 0,
        duration: 1,
        ease: 'power4.inOut',
        // onComplete: done
      },
      '<'
    )
    .to(
      '.cases-block-list',
      {
        opacity: 0,
      },
      '<'
    )
    .to(
      '.page-header__bar',
      {
        //   scaleX: 0,
        height: 0,
        yPercent: 0,
        y: '-3rem',
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in',
      },
      '>-=.3'
    );

  return exitTl;
};

export const WorkExitToCaseTransition = (
  transitioningView,
  conditions,
  target
) => {
  const idxClicked = [
    ...transitioningView.querySelectorAll('.case-study-block'),
  ].findIndex((el) => el.querySelector('a') === target);
  console.log(idxClicked);
  const title = transitioningView.querySelector('.page-header__title');
  if (title && !title.classList.contains('splitting')) {
    Splitting({ target: title, by: 'chars' });
  }
  const exitTl = gsap.timeline();
  exitTl
    .set('.page-header__title .char', {
      display: 'inline-block',
    })
    .to(
      '.page-header__title .char',
      {
        y: '-100%',
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
        stagger: {
          each: 0.02,
          ease: 'power2.out',
        },
        opacity: 0,
        duration: 0.5,
        ease: 'power3.in',
        // onComplete: done
      },
      '<'
    )
    .to(
      '.page-header__bar',
      {
        //   scaleX: 0,
        height: 0,
        yPercent: 0,
        y: '-3rem',
        opacity: 0,
        duration: 0.3,
        ease: 'power3.in',
      },
      '<'
    )
    .to(
      '.list-design-element',
      {
        y: '2rem',
        opacity: 0,
        stagger: 0.02,
      },
      '<'
    )
    .to(
      '.case-study-block',
      {
        y: '2rem',
        opacity: 0,
        ease: 'linear',
        stagger: {
          from: idxClicked,
          each: 0.05,
          grid: 'auto',
        },
      },
      '<'
    );

  return exitTl;
};
