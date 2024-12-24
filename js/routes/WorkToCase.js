import { Transition } from '@unseenco/taxi';
import gsap from 'gsap';

import MatchMediaManager from '../MatchMediaManager';

import { WorkExitToCaseTransition } from '../transitions/Work';
import { DefaultFadeIn } from '../transitions/Fade';
import { CaseEntryTransition } from '../transitions/Case';

export default class WorkToCaseTransition extends Transition {
  onLeave({ from, trigger, done }) {
    const tl = gsap.timeline({
      paused: true,
      onStart() {
        // window.navManager.hide();
        window.scrollTo({
          top: 0,
        });
      },
      onComplete() {
        done();
      },
    });

    MatchMediaManager.add(({ conditions }) => {
      tl.add(WorkExitToCaseTransition(from, conditions, trigger));
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
      tl.add(CaseEntryTransition(to, conditions));
    });

    tl.play();
  }
}
