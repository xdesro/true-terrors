import gsap from 'gsap';
import { Transition } from '@unseenco/taxi';

import {
  WritingExitTransition,
  WritingEnterTransition,
} from './Writing.transitions';
import {
  ArticleEnterTransition,
  ArticleExitTransition,
} from './Article.transitions';

export class WritingToArticleTransition extends Transition {
  onLeave({ from, trigger, done }) {
    const tl = gsap
      .timeline({
        paused: true,
        onComplete() {
          window.scrollTo({
            top: 0,
            behavior: 'instant',
          });
          done();
        },
      })
      .add(WritingExitTransition(from));
    tl.play();
  }
  onEnter({ to, trigger, done }) {
    const tl = gsap.timeline({
      paused: true,
      onComplete() {
        done();
      },
    });
    tl.add(ArticleEnterTransition(to));
    tl.play();
  }
}

export class ArticleToWritingTransition extends Transition {
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
    tl.add(ArticleExitTransition(from));
    tl.play();
  }
  onEnter({ to, trigger, done }) {
    const tl = gsap.timeline({
      paused: true,
      onComplete() {
        done();
      },
    });
    tl.add(WritingEnterTransition(to));
    tl.play();
  }
}
