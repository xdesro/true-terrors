import { Transition } from '@unseenco/taxi';
import gsap from 'gsap';

import MatchMediaManager from '../MatchMediaManager';

import { WorkEnterTransition } from '../transitions/Work';
import { HomeExitTransition } from '../transitions/Home';

export default class HomeToWorkTransition extends Transition {
  onLeave({ from, done }) {
    const tl = gsap.timeline({
      paused: true,
      autoRemoveChildren: true,
      onComplete() {
        this.kill();
        done();
      },
    });

    tl.add(HomeExitTransition(from, mediaQueries));

    tl.play();
  }

  onEnter({ to, done }) {
    const tl = new gsap.timeline({
      paused: true,
      autoRemoveChildren: true,
      onComplete() {
        done();
      },
    });
    tl.add(WorkEnterTransition(to, mediaQueries));

    tl.play();
  }
}
