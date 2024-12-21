import { Transition } from '@unseenco/taxi';
import gsap from 'gsap';

import { convertSplitElIntoLines } from '../utils/convertSplitElIntoLines';

import NavManager from '../NavManager';
import {
  WritingEnterTransition,
  WritingExitTransition,
} from './Writing.transitions';
import { WorkExitTransition } from './Work.transitions';
import { HomeEntranceTransition } from './Home.transitions';
// import Splitting from 'splitting';
// import {
//   ArticleEnterTransition,
//   ArticleExitTransition,
// } from "./Article.transitions";
// import {
//   WritingEnterTransition,
//   WritingExitTransition,
// } from "./Writing.transitions";
// import { CaseExitTransition } from "./Case.transitions";

export class WritingToHomeTransition extends Transition {
  /**
   * Handle the transition leaving the previous page.
   * @param { { from: HTMLElement, trigger: string|HTMLElement|false, done: function } } props
   */
  onLeave({ from, trigger, done }) {
    console.log('WRITING TO HOME');
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

    return;
    if (/\/(writing|notes)\/[\w-]+/.test(new URL(trigger.href).pathname)) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    const tl0 = new gsap.timeline({
      paused: true,
      // duration: 0.15,
      onStart() {
        // new NavManager();
      },
      onComplete() {
        window.scrollTo({
          top: 0,
          behavior: 'instant',
        });
        done();
      },
    });
    const path = window.location.pathname;
    switch (true) {
      case /^\/(writing|notes)\/?$/.test(path): {
        console.log('writing list page exit');
        tl.add(WritingExitTransition(from));
        break;
      }
      case /\/writing\/[\w-]+/.test(path): {
        tl.add(ArticleExitTransition(from));
        break;
      }
      case /^\/(work)\/?$/.test(path): {
        console.log('work list page exit');
        tl.add(WorkExitTransition(from));
        break;
      }
      case /\/work\/[\w-]+/.test(path): {
        console.log('case study article page exit', CaseExitTransition(from));
        tl.add(CaseExitTransition(from));
        break;
      }
      default: {
        tl.to(from, {
          opacity: 0,
          duration: 0.3,
        });
        break;
      }
    }
    tl.play();
  }

  /**
   * Handle the transition entering the next page.
   * @param { { to: HTMLElement, trigger: string|HTMLElement|false, done: function } } props
   */
  onEnter({ to, trigger, done }) {
    Splitting({ target: to.querySelector('.segment--first'), by: 'chars' });
    Splitting({ target: to.querySelector('.segment--third'), by: 'chars' });
    Splitting({
      target: to.querySelector('.home-hero__description'),
      by: 'lines',
    });
    const tl = gsap.timeline({
      paused: true,
      onComplete() {
        done();
      },
    });
    tl.add(HomeEntranceTransition());
    tl.play();
    return;
    // done();
    // return;
    const tl0 = new gsap.timeline({
      paused: true,
      duration: 0.15,
      onStart() {
        new NavManager();
      },
      onComplete() {
        done();
      },
    });

    // console.log(window.location.pathname, to.dataset)
    const path = window.location.pathname;
    switch (true) {
      case /^\/(work)\/?$/.test(path): {
        tl.add(WorkEnterTransition(to));
        break;
      }
      case /^\/(writing|notes)\/?$/.test(path): {
        console.log('this is a writing list path');
        tl.add(WritingEnterTransition(to));
        break;
      }
      case /\/writing\/[\w-]+/.test(path): {
        console.log('this is a writing path');
        tl.add(ArticleEnterTransition(to));
        break;
      }
      case /^\/(about)\/?$/.test(path): {
        console.log('this is an about path');
        tl.add(WritingEnterTransition(to));
        break;
      }
      default: {
        tl.from(to, {
          opacity: 0,
        });
        break;
      }
    }
    tl.play();
  }
}

export class HomeToWritingTransition extends Transition {
  /**
   * Handle the transition leaving the previous page.
   * @param { { from: HTMLElement, trigger: string|HTMLElement|false, done: function } } props
   */
  onLeave({ from, trigger, done }) {
    gsap.timeline({}).to(from, {
      opacity: 0,
      duration: 0.2,
      onComplete() {
        window.scrollTo({
          top: 0,
          behavior: 'instant',
        });
        done();
      },
    });
    return;
  }

  /**
   * Handle the transition entering the next page.
   * @param { { to: HTMLElement, trigger: string|HTMLElement|false, done: function } } props
   */
  onEnter({ to, trigger, done }) {
    console.log('ON ENTER HOME TO WRITING');
    // if (window.location.pathname === "/") {
    //   navManager.hide();
    //   document.body.classList.add('home')
    // } else {
    //   navManager.show();
    //   document.body.classList.remove('home')
    // }
    const tl = new gsap.timeline({
      paused: true,
      onStart() {
        new NavManager();
      },
      onComplete() {
        done();
      },
    });
    tl.add(WritingEnterTransition(to));
    tl.play();
    return;
    // done();
    // return;
    const tl0 = new gsap.timeline({
      paused: true,
      duration: 0.15,
      onStart() {
        new NavManager();
      },
      onComplete() {
        done();
      },
    });

    // console.log(window.location.pathname, to.dataset)
    const path = window.location.pathname;
    switch (true) {
      case /^\/(work)\/?$/.test(path): {
        tl.add(WorkEnterTransition(to));
        break;
      }
      case /^\/(writing|notes)\/?$/.test(path): {
        console.log('this is a writing list path');
        tl.add(WritingEnterTransition(to));
        break;
      }
      case /\/writing\/[\w-]+/.test(path): {
        console.log('this is a writing path');
        tl.add(ArticleEnterTransition(to));
        break;
      }
      case /^\/(about)\/?$/.test(path): {
        console.log('this is an about path');
        tl.add(WritingEnterTransition(to));
        break;
      }
      default: {
        tl.from(to, {
          opacity: 0,
        });
        break;
      }
    }
    tl.play();
  }
}
