import { Transition } from "@unseenco/taxi";
import gsap from "gsap";
import NavManager from "../NavManager";

export default class DefaultTransition extends Transition {
  /**
   * Handle the transition leaving the previous page.
   * @param { { from: HTMLElement, trigger: string|HTMLElement|false, done: function } } props
   */
  onLeave({ from, trigger, done }) {

    gsap.to(from, {
      opacity: 0,
      duration: 0.3,
      onComplete() {
        // document.documentElement.style.scrollBehavior = "auto";
        window.scrollTo({ 
          top: 0,
        behavior: 'instant'});
        done();
      },
    });
    // }
  }

  /**
   * Handle the transition entering the next page.
   * @param { { to: HTMLElement, trigger: string|HTMLElement|false, done: function } } props
   */
  onEnter({ to, trigger, done }) {
    gsap.from(to, {
      opacity: 0,
      duration: 0.3,
      onStart() {
        new NavManager();
      },
      onComplete() {
        done();
      },
    });
  }
}
