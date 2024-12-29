import gsap from 'gsap';

window.mm = gsap.matchMedia();

const breakpoints = {
  isMobile: `(max-width: 599px)`,
  isTablet: `(min-width: 600px) and (max-width: 899px)`,
  isDesktop: `(min-width: 900px)`,
  prefersReducedMotion: '(prefers-reduced-motion: reduce)',
};

mm.add(breakpoints, () => {});

const MatchMediaManager = {
  mm,
  add(callback) {
    mm.add(breakpoints, callback);
  },
};

export default MatchMediaManager;
