import { gsap } from 'gsap';
import MatchMediaManager from '../../js/MatchMediaManager';

import { CustomEase } from 'gsap/CustomEase';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
document.fonts.ready.then(function () {
  MatchMediaManager.add(({ conditions }) => {
    const { isMobile, isTablet, isDesktop, prefersReducedMotion } = conditions;
    gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

    const titleSplit = SplitText.create('.intro__title', { type: 'words' });
    const ch2TitleSplit = SplitText.create('.chapter-two-hero__title', {
      type: 'words',
    });
    const ch3TitleSplit = SplitText.create('.chapter-three-hero__title', {
      type: 'lines',
    });
    const ch4TitleSplit = SplitText.create('.chapter-four-hero__title', {
      type: 'words',
    });
    const ch5TitleSplit = SplitText.create('.chapter-five-hero__title', {
      type: 'lines',
    });
    const introTl = gsap
      .timeline()
      .set('.intro', {
        visibility: 'visible',
      })
      .from('.intro', {
        opacity: 0,
      })
      .from('.intro__card', {
        scale: prefersReducedMotion ? 1 : 0.7,
        opacity: 0,
        duration: 0.5,
      })
      .from(
        titleSplit.words,
        {
          duration: 0.5,
          x: prefersReducedMotion ? 0 : -16,
          autoAlpha: 0,
          stagger: prefersReducedMotion ? 0 : 0.05,
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
          clipPath: prefersReducedMotion
            ? null
            : 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)',
          stagger: 0.1,
          xPercent: prefersReducedMotion ? 0 : -2,
          duration: 0.3,
        },
        '-=.3'
      );

    const tocTl = gsap.timeline().from('.toc__title, .toc__list li', {
      filter: prefersReducedMotion ? null : 'blur(2px)',
      autoAlpha: 0,
      stagger: 0.1,
      x: prefersReducedMotion ? 0 : 16,
      scrollTrigger: {
        trigger: '.toc',
        start: 'top bottom-=100px',
        end: 'bottom bottom-=100px',
        scrub: 0.3,
      },
    });

    const dividerTl = [...document.querySelectorAll('hr')].map((divider) => {
      return gsap.from(divider, {
        scaleX: prefersReducedMotion ? 1 : 0,
        '--glyph-opacity': 0,
        scrollTrigger: {
          trigger: divider,
          start: 'top bottom-=100px',
          end: 'top bottom-=300px',
          scrub: 0.5,
        },
      });
    });

    const chapterCounterTl = [
      ...document.querySelectorAll('.chapter-counter'),
    ].map((counter) => {
      return gsap.from(counter, {
        filter: prefersReducedMotion ? null : 'blur(2px)',
        opacity: 0,
        scrollTrigger: {
          trigger: counter,
          start: 'top bottom-=100px',
          end: 'top bottom-=300px',
          scrub: 0.5,
        },
      });
    });

    const ch1HeaderTl = gsap
      .timeline({
        scrollTrigger: {
          trigger: '.chapter-one-hero picture',
          start: 'top bottom',
          end: 'top center-=100px',
          scrub: 1,
        },
      })
      .from('.chapter-one-hero picture', {
        scale: prefersReducedMotion ? 1 : 0.8,
      })
      .from(
        '.chapter-one-hero__title > span:first-child',
        {
          y: prefersReducedMotion ? 0 : '1em',
          filter: prefersReducedMotion ? null : 'blur(4px)',

          clipPath: prefersReducedMotion
            ? null
            : 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        },
        '>-=.3'
      )
      .from(
        '.chapter-one-hero__title > span:last-child',
        {
          y: prefersReducedMotion ? 0 : '-1em',
          filter: prefersReducedMotion ? null : 'blur(4px)',

          clipPath: prefersReducedMotion
            ? null
            : 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
        },
        '<+=.1'
      )
      .from(
        '.chapter-one-hero__title > span:nth-child(2)',
        {
          filter: prefersReducedMotion ? null : 'blur(4px)',
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
          yPercent: prefersReducedMotion ? 0 : -10,
        },
        {
          yPercent: prefersReducedMotion ? 0 : 10,
          scrollTrigger: {
            trigger: '.pastoral-aside picture',
            scrub: 0.5,
            start: 'top bottom',
            end: 'bottom top',
          },
        }
      )
      .from('.pastoral-aside__title', {
        filter: prefersReducedMotion ? null : 'blur(4px)',
        autoAlpha: 0,
        scrollTrigger: {
          trigger: '.pastoral-aside__title',
          scrub: 0.5,
          start: 'top bottom',
          end: 'center center',
        },
      });

    const disclaimerTl = gsap
      .timeline({
        scrollTrigger: {
          trigger: '.disclaimer',
          start: 'top bottom',
          end: 'center center',
          scrub: true,
        },
      })
      .from('.disclaimer__label', {
        opacity: 1,
        clipPath: prefersReducedMotion
          ? null
          : 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)',
        // xPercent: -2,
        duration: 0.3,
      })
      .from('.disclaimer__text', {
        filter: prefersReducedMotion ? null : 'blur(4px)',
        opacity: 0,
      });

    const ch2HeaderImageTl = gsap.timeline().fromTo(
      '.chapter-two-hero picture',
      {
        yPercent: prefersReducedMotion ? 0 : -10,
      },
      {
        yPercent: prefersReducedMotion ? 0 : 10,
        scrollTrigger: {
          trigger: '.chapter-two-hero picture',
          scrub: 0.5,
          start: 'top bottom',
          end: 'bottom top',
        },
      }
    );

    const ch2HeaderTl = gsap
      .timeline({
        scrollTrigger: {
          trigger: '.chapter-two-hero__title span',
          start: 'top bottom',
          end: 'top center',
          scrub: 0.5,
        },
      })
      .from(ch2TitleSplit.words, {
        x: prefersReducedMotion ? 0 : -8,
        autoAlpha: 0,
        stagger: 0.1,
        filter: prefersReducedMotion ? null : 'blur(2px)',
      });

    const noLongerAsideTl = gsap
      .timeline({
        scrollTrigger: {
          trigger: '.no-longer-aside',
          start: 'top bottom',
          end: 'center center',
          scrub: 0.5,
        },
      })
      .from(
        '.no-longer-aside figure:first-child, .no-longer-aside__text span:first-child',
        {
          opacity: 0,
          x: prefersReducedMotion ? 0 : -32,
          stagger: 0.1,
        }
      )
      .from(
        '.no-longer-aside__text span:last-child, .no-longer-aside figure:last-child',
        {
          opacity: 0,
          x: prefersReducedMotion ? 0 : 32,
          stagger: prefersReducedMotion ? 0 : 0.1,
        },
        '<+.5'
      );

    const ch3HeaderTl = gsap
      .timeline({
        scrollTrigger: {
          trigger: '.chapter-three-hero__title',
          start: 'top bottom',
          end: 'center center',
          scrub: 1,
        },
      })
      .from(ch3TitleSplit.lines, {
        autoAlpha: 0,
        x: prefersReducedMotion ? 0 : 32,
        filter: prefersReducedMotion ? null : 'blur(4px)',
        stagger: prefersReducedMotion ? 0 : 0.05,
      });

    const ch4HeaderTl = gsap.timeline({}).from(ch4TitleSplit.words, {
      x: prefersReducedMotion ? 0 : -32,
      autoAlpha: 0,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.chapter-four-hero__title',
        start: 'top bottom',
        end: 'center center',
        scrub: 0.5,
      },
    });

    const ch4HeaderImageTl = gsap.timeline().fromTo(
      '.chapter-four-hero picture',
      {
        yPercent: prefersReducedMotion ? 0 : -10,
      },
      {
        yPercent: prefersReducedMotion ? 0 : 10,
        scrollTrigger: {
          trigger: '.chapter-four-hero picture',
          scrub: 0.5,
          start: 'top bottom',
          end: 'bottom top',
        },
      }
    );

    const ch5HeaderTl = gsap.timeline().from(ch5TitleSplit.lines, {
      y: prefersReducedMotion ? 0 : -16,
      autoAlpha: 0,
      filter: 'blur(4px)',
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.chapter-five-hero__title',
        start: 'top bottom',
        end: 'center center',
        scrub: 0.5,
      },
    });
    const ch5HeaderImageTl = gsap.timeline().fromTo(
      '.chapter-five-hero picture',
      {
        yPercent: prefersReducedMotion ? 0 : -10,
      },
      {
        yPercent: prefersReducedMotion ? 0 : 10,
        scrollTrigger: {
          trigger: '.chapter-five-hero picture',
          scrub: 0.5,
          start: 'top bottom',
          end: 'bottom top',
        },
      }
    );

    const websitesCalloutTl = gsap.from('.websites-callout', {
      filter: 'blur(4px)',
      opacity: 0,
      scrollTrigger: {
        trigger: '.websites-callout',
        start: 'top bottom',
        end: 'center center',
        scrub: 0.5,
      },
    });
    const ch6HeaderTl = gsap.from('.chapter-six-hero__title', {
      filter: 'blur(4px)',
      opacity: 0,
      scrollTrigger: {
        trigger: '.chapter-six-hero__title',
        start: 'top bottom',
        end: 'center center',
        scrub: 0.5,
      },
    });
  });
});
