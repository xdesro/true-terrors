import gsap from 'gsap';
import { Transition } from '@unseenco/taxi';

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
    tl.add(ArticleExitTransition(from, mediaQueries));
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
