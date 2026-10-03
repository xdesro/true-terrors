import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const fromCenter = (distance) => (_, word) => {
  const { left, width } = word.getBoundingClientRect();
  const parent = word.parentElement.getBoundingClientRect();
  return left + width / 2 < parent.left + parent.width / 2
    ? distance
    : -distance;
};

export default ({ prefersReducedMotion, onUpdate }) => {
  const tl = gsap.timeline({ onUpdate }).set('.intro', {
    visibility: 'visible',
  });

  if (prefersReducedMotion) {
    return tl.from('.intro > :not(picture)', {
      autoAlpha: 0,
      duration: 0.5,
    });
  }

  const titleSplit = SplitText.create('.intro__title', { type: 'words' });
  const subtitleSplit = SplitText.create('.intro__subtitle', { type: 'words' });

  return tl
    .from(titleSplit.words, {
      duration: 0.5,
      x: fromCenter(16),
      autoAlpha: 0,
    })
    .from(
      subtitleSplit.words,
      {
        autoAlpha: 0,
        x: fromCenter(4),
        stagger: { each: 0.02, from: 'center' },
        duration: 0.5,
      },
      '<+=.3',
    )
    .from(
      '.intro__label',
      {
        autoAlpha: 0,
        filter: 'blur(2px)',
        duration: 0.8,
      },
      '-=.3',
    );
};
