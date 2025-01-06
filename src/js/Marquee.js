import gsap from 'gsap';
import MatchMediaManager from './MatchMediaManager';
import horizontalLoop from './utils/horizontalLoop';
const INIT_SCALE_FACTOR = 0.4;

export default class Marquee {
  constructor(targetWrapperSelector, targetSelector) {
    this.targetWrapper = document.querySelector(targetWrapperSelector);
    this.targets = gsap.utils.toArray(targetSelector);
    this.marquee = horizontalLoop(this.targets, {
      repeat: -1,
      speed: 0.75,
    });
    this.targetWrapper.addEventListener('mouseenter', () =>
      gsap.to(this.marquee, { timeScale: 0.1, overwrite: true })
    );
    this.targetWrapper.addEventListener('mouseleave', () =>
      gsap.to(this.marquee, { timeScale: 1, overwrite: true })
    );
  }
}
