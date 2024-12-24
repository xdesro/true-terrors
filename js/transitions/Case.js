import gsap from 'gsap';
import { convertSplitElIntoLines } from '../utils/convertSplitElIntoLines';
import { DefaultFadeIn } from './Fade';

export const CaseEntryTransition = (transitioningView, mediaQueries) => {
  const { prefersReducedMotion } = mediaQueries;

  const title = transitioningView.querySelector('.case-header__title');
  const abstract = transitioningView.querySelector('.case-header__abstract');
  const tl = gsap.timeline();

  if (prefersReducedMotion) {
    tl.add(DefaultFadeIn(transitioningView));
  } else {
    Splitting({
      target: title,
      by: 'chars',
    });
    Splitting({
      target: abstract,
      by: 'lines',
    });
    abstract.innerHTML = convertSplitElIntoLines(abstract);

    tl.from('.case-header__logo, .case-header__title .char', {
      ease: 'power3.inOut',
      duration: 0.5,
      filter: 'blur(2px)',
      opacity: 0,
      stagger: 0.02,
    })
      .from(
        '.case-header__abstract .line',
        {
          y: '-50%',
          opacity: 0,
          stagger: 0.05,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          duration: 0.5,
        },
        '<+=.3'
      )
      .from(
        '.case-header__meta div :is(dt, dd:not(:has(ul)), li)',
        {
          opacity: 0,
          duration: 0.5,
        },
        '<+=.2'
      )
      .from(
        '.table-of-contents :is(h2, li)',
        {
          y: '50%',
          opacity: 0,
          stagger: 0.05,
          clipPath: 'polygon(0% 0%, 140% 0%, 140% 0%, 0% 0%)',
          duration: 0.5,
        },
        '<+=.2'
      )
      .from(
        '.article-content, .further-reading',
        {
          opacity: 0,
          duration: 0.3,
        },
        '<+=.2'
      );
  }
  return tl;
};
export const CaseExitTransition = (transitioningView, conditions) => {
  const exitTl = gsap.timeline({
    clearProps: true,
    onStart() {
      console.log('playing');
    },
  });
  exitTl.to(
    '.case-header__logo, .case-header__title, .case-header__abstract, .case-header__meta, .table-of-contents, .article-content',
    {
      opacity: 0,
      y: '50%',
      ease: 'power4.in',
      stagger: 0.05,
      duration: 0.3,
    }
  );
  return exitTl;
};
