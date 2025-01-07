import gsap from 'gsap';
import { convertSplitElIntoLines } from '../utils/convertSplitElIntoLines';
import { DefaultFadeOut } from './Fade';

export const WritingEnterTransition = (transitioningView, conditions) => {
  const { prefersReducedMotion } = conditions;
  const title = transitioningView.querySelector('.page-header__title');
  const description = transitioningView.querySelector(
    '.page-header__description'
  );
  Splitting({ target: title, by: 'chars' });
  if (description) {
    Splitting({ target: description, by: 'lines' });
    description.innerHTML = convertSplitElIntoLines(description);
  }

  const enterTl = gsap.timeline();
  enterTl
    .set(title.querySelectorAll('.char'), {
      display: 'inline-block',
    })
    .from(
      title.querySelectorAll('.char'),
      {
        y: prefersReducedMotion ? 0 : '100%',
        clipPath: prefersReducedMotion
          ? null
          : 'polygon(0% 0%, 140% 0%, 140% 0%, 0% 0%)',
        stagger: {
          each: 0.02,
        },
        opacity: 0,
        duration: 1,
        ease: 'power4.inOut',
      },
      '<'
    )
    .from(
      '.page-header__description .line, .table-of-contents :is(h2, li)',
      {
        y: prefersReducedMotion ? 0 : '50%',
        opacity: 0,
        stagger: prefersReducedMotion ? 0 : 0.05,
        clipPath: prefersReducedMotion
          ? null
          : 'polygon(0% 0%, 140% 0%, 140% 0%, 0% 0%)',
        duration: 0.5,
      },
      '>-=.5'
    )
    .from(
      '.writing-section',
      {
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power4.inOut',
      },
      '<'
    );
};

export const WritingExitTransition = (transitioningView, mediaQueries) => {
  const { prefersReducedMotion, isMobile } = mediaQueries;
  const title = transitioningView.querySelector('.page-header__title');
  if (title && !title.classList.contains('splitting')) {
    Splitting({ target: title, by: 'chars' });
  }
  const exitTl = gsap.timeline();

  if (prefersReducedMotion || isMobile) {
    exitTl.add(DefaultFadeOut(transitioningView));
  } else {
    exitTl
      .set(title.querySelectorAll('.char'), {
        display: 'inline-block',
      })
      .to(
        title?.querySelectorAll('.char'),
        {
          y: '-100%',
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          stagger: {
            each: 0.02,
          },
          opacity: 0,
          duration: 1,
          ease: 'power4.inOut',
        },
        '<'
      )
      .to(
        '.page-header__description, .table-of-contents__title, .table-of-contents__list li',
        {
          y: '-50%',
          opacity: 0,
          ease: 'power3.in',
          stagger: 0.1,
          duration: 0.3,
        },
        '<+=.2'
      )
      .to(
        '.page-header, .writing-section',
        {
          opacity: 0,
          y: '-1rem',
          duration: 0.4,
          stagger: 0.03,
          ease: 'power3.in',
        },
        '<'
      );
  }

  return exitTl;
};
