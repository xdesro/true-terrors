import { Transition } from '@unseenco/taxi';
import gsap from 'gsap';

import { WritingEnterTransition } from '../transitions/Writing';
import { HomeExitTransition } from '../transitions/Home';

export default class HomeToWritingTransition extends Transition {
  onLeave({ from, done }) {
    const tl = gsap.timeline({
      paused: true,
      onComplete() {
        done();
      },
    });
    tl.add(HomeExitTransition(from, mediaQueries));
    tl.play();
  }

  onEnter({ to, done }) {
    const tl = new gsap.timeline({
      paused: true,
      onComplete() {
        done();
      },
    });
    tl.add(WritingEnterTransition(to, mediaQueries));
    tl.play();
    return;
  }
}
