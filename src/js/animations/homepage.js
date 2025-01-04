import gsap from '/js/vendor/gsap/esm/index.js';
import CustomEase from '/js/vendor/gsap/esm/CustomEase.js';

gsap.registerPlugin(CustomEase);

CustomEase.create('elastic1', 'M0,0 C0.36,-0.33 0.68,1 1,1');

const homeHero = document.querySelector('.home-hero');
const firstSegment = homeHero.querySelector('.segment--first');
const secondSegment = homeHero.querySelector('.segment--second');
const thirdSegment = homeHero.querySelector('.segment--third');
const marquee = homeHero.querySelector('.home-hero__marquee');
const accentImage = homeHero.querySelector('.home-hero__accent-image');
const warning = homeHero.querySelector('.home-hero__warning');
const navItemsToReveal = homeHero.querySelectorAll(
  '.home-nav__meta-title, .home-nav__list-item'
);
const description = homeHero.querySelector('.home-hero__description');

const headerTl = gsap.timeline({ clearProps: 'all' });
const firstSegmentTl = gsap.timeline();
const secondSegmentTl = gsap.timeline();
const thirdSegmentTl = gsap.timeline();

firstSegmentTl
  .set(firstSegment, {
    x: '34%',
  })
  .from(firstSegment, {
    opacity: 0,
    duration: 1,
  })
  .from(
    firstSegment,
    {
      clipPath: 'polygon(0% 0%, 34% 0%, 34% 110%, 0% 110%)',
    },
    '<+=.2'
  )
  .to(
    firstSegment,
    {
      x: 0,
    },
    '<'
  );

secondSegmentTl.from(secondSegment, {
  x: -20,
  opacity: 0,
  duration: 0.2,
});
thirdSegmentTl.from(thirdSegment, {
  x: -20,
  opacity: 0,
  duration: 0.2,
});

headerTl.add(firstSegmentTl);
headerTl.add(secondSegmentTl, '>-=.2');
headerTl.from(
  accentImage,
  {
    opacity: 0,
    height: 0,
  },
  '<-=.2'
);
headerTl.add(thirdSegmentTl, '<+=.1');
headerTl.from(
  marquee,
  {
    opacity: 0,
    duration: 0.4,
  },
  '<+=.1'
);
headerTl.from(
  warning,
  {
    opacity: 0,
    height: 0,
    y: '0',
  },
  '<'
);

headerTl.from(
  navItemsToReveal,
  {
    x: -20,
    opacity: 0,
    stagger: 0.05,
  },
  '<'
);

headerTl.from(
  description,
  {
    opacity: 0,
    duration: 0.8,
  },
  '>'
);

export default headerTl;
