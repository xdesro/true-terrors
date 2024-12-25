import gsap from 'gsap';
import { Transition } from '@unseenco/taxi';

import { WritingExitTransition } from '../transitions/Writing';
import { ArticleEnterTransition } from '../transitions/Article';

export default class WritingToArticleTransition extends Transition {
  onLeave({ from, trigger, done }) {
    const tl = gsap.timeline({
      paused: true,
      onComplete() {
        // window.scrollTo({
        //   top: 0,
        //   behavior: 'smooth',
        // });
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
    tl.add(ArticleEnterTransition(to, mediaQueries));
    tl.play();
  }
}
