import gsap from 'gsap';

const FADE_DURATION = 0.5;

export const ToAWebsiteToDestroy = (transitioningView) => {
  return gsap
    .timeline()
    .to(transitioningView, {
      opacity: 0,
      duration: FADE_DURATION,
      onStart: () => {
        console.log('TRANSITIONING');
      },
    })
    .to(
      'body',
      {
        backgroundColor: '#eae8e1',
      },
      '<'
    );
};
