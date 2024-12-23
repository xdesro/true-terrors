import { Transition } from '@unseenco/taxi';
import gsap from 'gsap';

import MatchMediaManager from '../MatchMediaManager';

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

    MatchMediaManager.add(({ conditions }) => {
      tl.add(WritingExitTransition(from, conditions));
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
      tl.add(HomeEntranceTransition(to, conditions));
    });

    tl.play();
  }
}
