import { Transition } from '@unseenco/taxi';
import gsap from 'gsap';
import { DefaultFadeIn, DefaultFadeOut } from './Fade';

export default class DefaultTransition extends Transition {
  onLeave({ from, trigger, done }) {
    if (trigger.href === '/') {
      navManager.hide();
    }
    const tl = gsap.timeline({
      paused: true,
      onComplete() {
        done();
      },
    });
    tl.add(DefaultFadeOut(from));
    tl.play();
  }
  onEnter({ to, trigger, done }) {
    if (window.location.pathname === '/') {
      navManager.hide();
      document.body.classList.add('home');
    } else {
      navManager.show();
      document.body.classList.remove('home');
    }
    const tl = gsap.timeline({
      paused: true,
      onComplete() {
        done();
      },
    });
    tl.add(DefaultFadeIn(to));
    tl.play();
  }
}
