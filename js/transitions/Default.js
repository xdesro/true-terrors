import { Transition } from '@unseenco/taxi';
import gsap from 'gsap';

import NavManager from '../NavManager';

import { WorkEnterTransition, WorkExitTransition } from './Work';
import { ArticleEnterTransition, ArticleExitTransition } from './Article';
import { WritingEnterTransition, WritingExitTransition } from './Writing';
import { CaseExitTransition } from './Case';

export default class DefaultTransition extends Transition {
  /**
   * Handle the transition leaving the previous page.
   * @param { { from: HTMLElement, trigger: string|HTMLElement|false, done: function } } props
   */
  onLeave({ from, trigger, done }) {
    // console.log('leaving in default')
    if (trigger.href === '/') {
      navManager.hide();
    }
    gsap.timeline({}).to(from, {
      opacity: 0,
      duration: 0.2,
      onComplete() {
        done();
      },
    });
    return;
    if (/\/(writing|notes)\/[\w-]+/.test(new URL(trigger.href).pathname)) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    const tl = new gsap.timeline({
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
    if (window.location.pathname === '/') {
      navManager.hide();
      document.body.classList.add('home');
    } else {
      navManager.show();
      document.body.classList.remove('home');
    }
    gsap.timeline({}).from(to, {
      opacity: 0,
      duration: 0.2,
      onComplete() {
        done();
      },
    });
    return;
    // done();
    // return;
    const tl = new gsap.timeline({
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
