import { Transition } from '@unseenco/taxi';
import gsap from 'gsap';

import { WritingExitTransition } from '../transitions/Writing';
import { HomeEntranceTransition } from '../transitions/Home';

export default class WritingToHomeTransition extends Transition {
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
    tl.add(WritingExitTransition(from, mediaQueries));
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
