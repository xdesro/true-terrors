import { Transition } from '@unseenco/taxi';
import gsap from 'gsap';

import MatchMediaManager from '../MatchMediaManager';

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

    MatchMediaManager.add(({ conditions }) => {
      tl.add(WorkExitTransition(from, conditions));
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
