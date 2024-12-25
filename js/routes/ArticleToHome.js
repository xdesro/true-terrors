import gsap from 'gsap';
import { Transition } from '@unseenco/taxi';

import { HomeEntranceTransition } from '../transitions/Home';
import { ArticleExitTransition } from '../transitions/Article';

export default class ArticleToHomeTransition extends Transition {
  onLeave({ from, trigger, done }) {
    const tl = gsap.timeline({
      paused: true,
      onComplete() {
        done();
      },
    });
    tl.add(ArticleExitTransition(from, mediaQueries));
    tl.play();
  }
  onEnter({ to, done }) {
    const tl = new gsap.timeline({
      paused: true,
      onComplete() {
        done();
      },
    });
    tl.add(HomeEntranceTransition(to, mediaQueries));
    tl.play();
  }
}
