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
    tl.add(WritingExitTransition(from, mediaQueries));
    tl.play();
  }
  onEnter({ to, trigger, done }) {
    const tl = gsap.timeline({
      paused: true,
      onComplete() {
        done();
      },
    });
    tl.add(WritingEnterTransition(to, mediaQueries));
    tl.play();
  }
}
