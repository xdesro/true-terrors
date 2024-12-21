import gsap from 'gsap';

export const HomeEntranceTransition = () => {
  const tl = new gsap.timeline();
  tl.from('.segment--first .char', {
    y: '100%',
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
        y: '-.5em',
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
      `.home-hero__description .word[style*="--line-index: 0;"]`,
      {
        y: '50%',
        opacity: 0,
        clipPath: 'polygon(0% 0%, 140% 0%, 140% 0%, 0% 0%)',
        //   clipPath: "polygon(0% 140%, 100% 140%, 100% 140%, 0% 140%)",
        duration: 0.5,
      },
      '<'
    )
    .from(
      '.home-hero__description .word[style*="--line-index: 1;"]',
      {
        y: '50%',
        opacity: 0,
        clipPath: 'polygon(0% 0%, 140% 0%, 140% 0%, 0% 0%)',
        //   clipPath: "polygon(0% 140%, 100% 140%, 100% 140%, 0% 140%)",
        duration: 0.5,
      },
      '<+=.05'
    )
    .from(
      '.home-hero__description .word[style*="--line-index: 2;"]',
      {
        y: '50%',
        opacity: 0,
        clipPath: 'polygon(0% 0%, 140% 0%, 140% 0%, 0% 0%)',
        //   clipPath: "polygon(0% 140%, 100% 140%, 100% 140%, 0% 140%)",
        duration: 0.5,
      },
      '<+=.05'
    )
    .from(
      '.home-hero__accent-image',
      {
        opacity: 0,
        ease: 'power4.inOut',
      },
      'test'
    )
    .from(
      '.home-hero__warning',
      {
        opacity: 0,
        filter: 'blur(5px)',
      },
      '<'
    );

  return tl;
};

export const HomeExitTransition = (transitioningView) => {
  const title = transitioningView.querySelector('.segment--first');
  Splitting({
    target: transitioningView.querySelector('.segment--first'),
    by: 'chars',
  });
  Splitting({
    target: transitioningView.querySelector('.segment--third'),
    by: 'chars',
  });
  Splitting({
    target: transitioningView.querySelector('.home-hero__description'),
    by: 'lines',
  });

  const exitTl = gsap.timeline();
  exitTl
    .to('.segment--first .char', {
      y: '100%',
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
        height: 0,
        opacity: 0,
        duration: 0.3,
      },
      '<+=.2'
    )
    .to(
      '.home-hero__description .word[style*="--line-index: 0;"]',
      {
        y: '-1em',
        opacity: 0,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 0.3,
      },
      '<'
    )
    .to(
      '.home-hero__description .word[style*="--line-index: 1;"]',
      {
        y: '-1em',
        opacity: 0,
        // clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',

        duration: 0.3,
      },
      '<+=.04'
    )
    .to(
      '.home-hero__description .word[style*="--line-index: 2;"]',
      {
        y: '-1em',
        opacity: 0,
        // clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',

        duration: 0.3,
      },
      '<+=.04'
    );

  return exitTl;
};
