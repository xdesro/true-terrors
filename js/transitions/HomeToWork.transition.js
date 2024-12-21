import { Transition } from '@unseenco/taxi';
import gsap from 'gsap';

import NavManager from '../NavManager';

import { WorkEnterTransition } from './Work.transitions';
import { HomeExitTransition } from './Home.transitions';
// import {
//   ArticleEnterTransition,
//   ArticleExitTransition,
// } from "./Article.transitions";
// import {
//   WritingEnterTransition,
//   WritingExitTransition,
// } from "./Writing.transitions";
// import { CaseExitTransition } from "./Case.transitions";

export default class HomeToWorkTransition extends Transition {
  /**
   * Handle the transition leaving the previous page.
   * @param { { from: HTMLElement, trigger: string|HTMLElement|false, done: function } } props
   */
  onLeave({ from, trigger, done }) {
    console.log('ON LEAVE HOME TO WORK');

    const tl = gsap.timeline({
      paused: true,
      onComplete() {
        done();
      },
    });

    tl.add(HomeExitTransition(from));
    tl.play();
    return;
  }

  /**
   * Handle the transition entering the next page.
   * @param { { to: HTMLElement, trigger: string|HTMLElement|false, done: function } } props
   */
  onEnter({ to, trigger, done }) {
    console.log('ON ENTER');
    const tl = new gsap.timeline({
      paused: true,
      onStart() {
        new NavManager();
      },
      onComplete() {
        done();
      },
    });
    tl.add(WorkEnterTransition(to));
    tl.play();
    return;
  }
}
