import { Transition } from '@unseenco/taxi';
import gsap from 'gsap';

import { WorkExitToCaseTransition } from '../transitions/Work';
import { CaseEntryTransition } from '../transitions/Case';

export default class WorkToCaseTransition extends Transition {
  onLeave({ from, trigger, done }) {
    const tl = gsap.timeline({
      paused: true,
      onStart() {
        window.scrollTo({
          top: 0,
        });
      },
      onComplete() {
        done();
      },
    });
    tl.add(WorkExitToCaseTransition(from, mediaQueries, trigger));
    tl.play();
  }

  onEnter({ to, done }) {
    const tl = new gsap.timeline({
      paused: true,
      onComplete() {
        done();
      },
    });

    tl.add(CaseEntryTransition(to, mediaQueries));

    tl.play();
  }
}
