import gsap from 'gsap';
import { Transition } from '@unseenco/taxi';

import MatchMediaManager from '../MatchMediaManager';

import { WritingExitTransition } from '../transitions/Writing';
import { ArticleEnterTransition } from '../transitions/Article';

export default class WritingToArticleTransition extends Transition {
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
      tl.add(ArticleEnterTransition(to, conditions));
    });
    tl.play();
  }
}
