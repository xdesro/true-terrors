import gsap from 'gsap';
import { DefaultFadeIn, DefaultFadeOut } from './Fade';
import { convertSplitElIntoLines } from '../utils/convertSplitElIntoLines';

export const ArticleEnterTransition = (transitioningView, conditions) => {
  const { prefersReducedMotion } = conditions;
  const tl = gsap.timeline();
  if (prefersReducedMotion) {
    tl.add(DefaultFadeIn(transitioningView));
  } else {
    const title = transitioningView.querySelector('.article-header__title');
    Splitting({ target: title, by: 'lines' });
    title.innerHTML = convertSplitElIntoLines(title);

    tl.from(title.querySelectorAll('.line'), {
      y: '-50%',
      opacity: 0,
      stagger: 0.05,
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      duration: 0.5,
    })

      .from(
        '.article-header__meta div :is(dt, dd:not(:has(ul)), li)',
        {
          opacity: 0,
          duration: 0.5,
          y: '-50%',
          stagger: {
            each: 0.02,
            from: 'end',
          },
        },
        '<+=.2'
      )
      .from(
        '.article-header__category',
        {
          opacity: 0,
          duration: 0.5,
        },
        '<'
      )
      .from(
        '.table-of-contents :is(h2, li)',
        {
          opacity: 0,
          duration: 0.5,
          y: '-25%',
          stagger: {
            each: 0.02,
          },
        },
        '<+=.2'
      )
      .from(
        '.article-header__image',
        {
          opacity: 0,
          duration: 0.3,
        },
        '<'
      )
      .from(
        '.article-content, .further-reading',
        {
          opacity: 0,
          duration: 0.3,
        },
        '<+=.2'
      );
    //   tl.to(title)
  }
  return tl;
};

export const ArticleExitTransition = (transitioningView, conditions) => {
  const { prefersReducedMotion } = conditions;
  const tl = gsap.timeline();
  if (prefersReducedMotion) {
    tl.add(DefaultFadeOut(transitioningView));
  } else {
    tl.to(
      '.article-header__category, .article-header__title, .article-header__meta > div, .table-of-contents, .article-header__image, .article-content, .further-reading',
      {
        opacity: 0,
        y: '-2rem',
        ease: 'power3.in',
        stagger: 0.04,
        duration: 0.4,
      }
    );
  }
  return tl;
};
