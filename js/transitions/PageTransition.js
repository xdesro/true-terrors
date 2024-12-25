import { Transition } from '@unseenco/taxi';
import gsap from 'gsap';

export default class PageTransition extends Transition {
  constructor({ wrapper, exitTransition, enterTransition }) {
    super({ wrapper });
    this.exitTransition = exitTransition;
    this.enterTransition = enterTransition;
  }

  onLeave({ from, done }) {
    const tl = gsap.timeline({
      paused: true,
      onStart: () => {
        window.navManager.hide();
      },
      onComplete: () => {
        done();
      },
    });
    tl.add(this.exitTransition(from, window.mediaQueries));
    tl.play();
  }

  onEnter({ to, done }) {
    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        done();
      },
    });
    tl.add(this.enterTransition(to, window.mediaQueries));
    tl.play();
  }
}
