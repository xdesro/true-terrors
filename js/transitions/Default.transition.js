import { Transition } from "@unseenco/taxi";
import gsap from "gsap";
import NavManager from "../NavManager";
import workEntryTimeline from "./work.timeline";
import { WorkEnterTransition, WorkExitTransition } from "./Work.transitions";
import { ArticleEnterTransition } from "./Article.transitions";
import { WritingEnterTransition } from "./Writing.transitions";

export default class DefaultTransition extends Transition {
  /**
   * Handle the transition leaving the previous page.
   * @param { { from: HTMLElement, trigger: string|HTMLElement|false, done: function } } props
   */
  onLeave({ from, trigger, done }) {
    // window.scrollTo({
    //   top: 0,
    //   behavior: "instant",
    // });
    const tl = new gsap.timeline({
      paused: true,
      duration: 0.15,
      onStart() {
        // new NavManager();
      },
      onComplete() {
        // window.scrollTo({
        //   top: 0,
        //   behavior: "instant",
        // });
        done();
      },
    });
    const path = window.location.pathname;
    switch (path) {
      case "/work/": {
        tl.add(WorkExitTransition(from));
        break;
      }
      // case /\/writing\/[\w-]+/.test(path): {
      //   console.log('this is a writing path')
      //   tl.to(from, {
      //     opacity: 0,
      //   });
      //   break;
      // }
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
    if (window.location.pathname === "/") {
      navManager.hide();
    } else {
      navManager.show();
    }
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
      case /\/writing\/[\w-]+/.test(path): {
        console.log("this is a writing path");
        tl.add(ArticleEnterTransition(to));
        break;
      }
      case /^\/(writing|notes)\/?$/.test(path): {
        console.log("this is a writing list path");
        tl.add(WritingEnterTransition(to));
        break;
      }
      case /^\/(about)\/?$/.test(path): {
        console.log("this is an about path");
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
