import gsap from 'gsap';
import { Transition } from '@unseenco/taxi';

import MatchMediaManager from '../MatchMediaManager';

import { WritingEnterTransition } from '../transitions/Writing';
import { ArticleExitTransition } from '../transitions/Article';

export default class ArticleToWritingTransition extends Transition {
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
      tl.add(ArticleExitTransition(from, conditions));
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
