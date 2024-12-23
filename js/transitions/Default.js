import { Transition } from '@unseenco/taxi';
import gsap from 'gsap';

export default class DefaultTransition extends Transition {
  onLeave({ from, trigger, done }) {
    if (trigger.href === '/') {
      navManager.hide();
    }
    gsap.timeline().to(from, {
      opacity: 0,
      duration: 0.2,
      onComplete() {
        window.scrollTo({
          top: 0,
          behavior: 'instant',
        });
        done();
      },
    });
  }
  onEnter({ to, trigger, done }) {
    if (window.location.pathname === '/') {
      navManager.hide();
      document.body.classList.add('home');
    } else {
      navManager.show();
      document.body.classList.remove('home');
    }
    gsap.timeline({}).from(to, {
      opacity: 0,
      duration: 0.2,
      onComplete() {
        done();
      },
    });
  }
}
