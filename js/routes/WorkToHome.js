import { Transition } from '@unseenco/taxi';
import gsap from 'gsap';

import { WorkExitTransition } from '../transitions/Work';
import { HomeEntranceTransition } from '../transitions/Home';

export default class WorkToHomeTransition extends Transition {
  onLeave({ from, done }) {
    const tl = gsap.timeline({
      paused: true,
      onStart() {
        window.navManager.hide();
      },
      onComplete() {
        done();
      },
    });
    tl.add(WorkExitTransition(from, mediaQueries));
    tl.play();
  }

  onEnter({ to, done }) {
    const tl = new gsap.timeline({
      paused: true,
      onComplete() {
        done();
      },
    });
    tl.add(HomeEntranceTransition(to, mediaQueries));
    tl.play();
  }
}
