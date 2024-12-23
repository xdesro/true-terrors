import gsap from 'gsap';
import { Transition } from '@unseenco/taxi';

import MatchMediaManager from '../MatchMediaManager';

import {
  WritingEnterTransition,
  WritingExitTransition,
} from '../transitions/Writing';

export default class WritingToWritingTransition extends Transition {
  onLeave({ from, trigger, done }) {
    const tl = gsap.timeline({
      paused: true,
      onComplete() {
        window.scrollTo({
          top: 0,
          behavior: 'instant',
        });
        done();
      },
    });
    MatchMediaManager.add(({ conditions }) => {
      tl.add(WritingExitTransition(from, conditions));
    });
    tl.play();
  }
  onEnter({ to, trigger, done }) {
    const tl = gsap.timeline({
      paused: true,
      onComplete() {
        done();
      },
    });
    MatchMediaManager.add(({ conditions }) => {
      tl.add(WritingEnterTransition(to, conditions));
    });
    tl.play();
  }
}
