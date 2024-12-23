import { Transition } from '@unseenco/taxi';
import gsap from 'gsap';

import MatchMediaManager from '../MatchMediaManager';

import { WorkEnterTransition } from '../transitions/Work';
import { HomeExitTransition } from '../transitions/Home';

export default class HomeToWorkTransition extends Transition {
  onLeave({ from, done }) {
    const tl = gsap.timeline({
      paused: true,
      onComplete() {
        done();
      },
    });

    MatchMediaManager.add(({ conditions }) => {
      tl.add(HomeExitTransition(from, conditions));
    });

    tl.play();
  }

  onEnter({ to, done }) {
    const tl = new gsap.timeline({
      paused: true,
      onComplete() {
        done();
      },
    });

    MatchMediaManager.add(({ conditions }) => {
      tl.add(WorkEnterTransition(to, conditions));
    });

    tl.play();
  }
}
