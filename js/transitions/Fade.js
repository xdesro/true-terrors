import gsap from 'gsap';

const FADE_DURATION = 0.2;

export const DefaultFadeOut = (transitioningView) => {
  return gsap.timeline().to(transitioningView, {
    opacity: 0,
    duration: FADE_DURATION,
  });
};
export const DefaultFadeIn = (transitioningView) => {
  return gsap.timeline().from(transitioningView, {
    opacity: 0,
    duration: FADE_DURATION,
  });
};
