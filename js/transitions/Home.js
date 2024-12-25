import gsap from 'gsap';
import { DefaultFadeOut } from './Fade';
import MatchMediaManager from '../MatchMediaManager';
import { convertSplitElIntoLines } from '../utils/convertSplitElIntoLines';

export const HomeEntranceTransition = (transitioningView, mediaQueries) => {
  const tl = gsap.timeline();
  const { prefersReducedMotion, isMobile } = mediaQueries;
  if (prefersReducedMotion) {
    tl.from(':scope > *', {
      opacity: 0,
      duration: 0.4,
    });
  } else {
    const desc = transitioningView.querySelector('.home-hero__description');
    Splitting({
      target: transitioningView.querySelector('.segment--first'),
      by: 'chars',
    });
    Splitting({
      target: transitioningView.querySelector('.segment--third'),
      by: 'chars',
    });
    Splitting({
      target: desc,
      by: 'lines',
    });
    desc.innerHTML = convertSplitElIntoLines(desc);
    tl.addLabel('transitionstart');
    tl.from('.segment--first .char', {
      y: '1em',
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      stagger: 0.02,
      opacity: 0,
      duration: 1,
      ease: 'power4.inOut',
    })
      .from(
        '.segment--third .char',
        {
          ease: 'power4.inOut',
          duration: 1,
          y: '-1em',
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          stagger: 0.02,
          opacity: 0,
        },
        '<'
      )

      .from(
        '.segment--second',
        {
          x: '-1rem',
          opacity: 0,
          duration: 0.4,
        },
        '<+=.5'
      )

      .from(
        '.home-hero__marquee',
        {
          clipPath: `polygon(0% 0%, 1px 0%, 0% 1px, 0% 0%)`,
          opacity: 0,
          ease: 'power3.inOut',
          duration: 0.5,
        },
        '<'
      )
      .add('test', '>')
      .from(
        '.home-nav__meta-title, .home-nav__list-item',
        {
          opacity: 0,
          duration: 0.5,
          y: '-25%',
          stagger: 0.02,
        },
        '<'
      )
      .from(
        '.home-hero__marquee-inner',
        {
          opacity: 0,
          duration: 0.5,
          ease: 'linear',
        },
        '>'
      )
      .from(
        `.home-hero__description .line`,
        {
          y: '50%',
          opacity: 0,
          clipPath: 'polygon(0% 0%, 140% 0%, 140% 0%, 0% 0%)',
          duration: 0.5,
          stagger: 0.04,
        },
        '<'
      )
      .from(
        '.home-hero__accent-image',
        {
          opacity: 0,
          ease: 'power4.inOut',
        },
        isMobile ? 'transitionstart' : 'test'
      )
      .from(
        '.home-hero__warning',
        {
          opacity: 0,
          filter: 'blur(5px)',
        },
        '<'
      );
  }
  return tl;
};

export const HomeExitTransition = (transitioningView, mediaQueries) => {
  const { prefersReducedMotion, isMobile } = mediaQueries;

  const exitTl = gsap.timeline({
    onStart() {
      if (isMobile) {
        // window.scrollTo({
        //   top: '0',
        // });
      }
    },
  });

  const title = transitioningView.querySelector('.segment--first');
  const desc = transitioningView.querySelector('.home-hero__description');

  if (prefersReducedMotion) {
    exitTl.add(DefaultFadeOut(transitioningView));
  } else {
    Splitting({
      target: title,
      by: 'chars',
    });
    Splitting({
      target: transitioningView.querySelector('.segment--third'),
      by: 'chars',
    });
    Splitting({
      target: desc,
      by: 'lines',
    });
    desc.innerHTML = convertSplitElIntoLines(desc);
    exitTl
      .to('.segment--first .char', {
        y: '1em',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        stagger: 0.02,
        opacity: 0,
        duration: 1,
        ease: 'power4.inOut',
      })
      .to(
        '.segment--third .char',
        {
          ease: 'power4.inOut',
          duration: 1,
          y: '-1lh',
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          stagger: 0.02,
          opacity: 0,
        },
        '<'
      )

      .to(
        '.segment--second',
        {
          x: '1rem',
          opacity: 0,
          duration: 0.4,
          ease: 'power4.in',
        },
        '<'
      )
      .to(
        '.home-hero__marquee',
        {
          clipPath: `polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)`,
          opacity: 0,
          ease: 'power3.inOut',
          duration: 0.5,
        },
        '<+=.2'
      )
      .to(
        '.home-nav__meta-title, .home-nav__list-item, .home-hero__warning',
        {
          opacity: 0,
          duration: 0.2,
          y: '-2em',
          ease: 'power3.in',
          stagger: 0.03,
        },
        '<'
      )
      .to(
        '.home-hero__accent-image',
        {
          y: '-1rem',
          height: isMobile ? '100%' : 0,
          opacity: 0,
          duration: 0.3,
        },
        '<+=.2'
      )
      .to(
        '.home-hero__description .line',
        {
          y: '-1em',
          opacity: 0,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          duration: 0.3,
          stagger: 0.04,
        },
        '<'
      );
  }
  return exitTl;
};
