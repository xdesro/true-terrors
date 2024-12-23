import gsap from 'gsap';

window.mm = gsap.matchMedia();

// Define breakpoints once as constants
const breakpoints = {
  isMobile: `(max-width: 599px)`,
  isTablet: `(min-width: 600px) and (max-width: 899px)`,
  isDesktop: `(min-width: 900px)`,
  prefersReducedMotion: '(prefers-reduced-motion: reduce)',
};

// Automatically register the breakpoints
mm.add(breakpoints, () => {});

const MatchMediaManager = {
  mm,
  add(callback) {
    // Use the predefined breakpoints for all `add()` calls
    mm.add(breakpoints, callback);
  },
};

export default MatchMediaManager;
