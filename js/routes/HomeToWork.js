import { Transition } from '@unseenco/taxi';
import gsap from 'gsap';

import MatchMediaManager from '../MatchMediaManager';

import { WorkEnterTransition } from '../transitions/Work';
import { HomeExitTransition } from '../transitions/Home';

export default class HomeToWorkTransition extends Transition {
  onLeave({ from, done }) {
    gsap
      .timeline({
        paused: true,
        onComplete: done,
      })
      .add(HomeExitTransition(from, mediaQueries))
      .play();
  }

  onEnter({ to, done }) {
    gsap
      .timeline({
        paused: true,
        onComplete: done,
      })
      .add(WorkEnterTransition(to, mediaQueries))
      .play();
  }
}
