import { Core, Renderer } from '@unseenco/taxi';
import DefaultTransition from './transitions/Default.transition';
import HomeToWorkTransition from './transitions/HomeToWork.transition';
import WorkToHomeTransition from './transitions/WorkToHome.transition';

import NavManager from './NavManager';
// import gsap from "gsap";
import Marquee from './Marquee';
import Clock from './Clock';
import {
  HomeToWritingTransition,
  WritingToHomeTransition,
} from './transitions/WritingToHome.transition';
import {
  ArticleToWritingTransition,
  WritingToArticleTransition,
} from './transitions/WritingToArticle.transition';
// import WorkTransition from "./transitions/Work.transitions";
// import WorkAltTransition from "./transitions/WorkAlt.transition";
window.navManager = new NavManager();
history.scrollRestoration = 'auto';


window.addEventListener('resize', e => {
  console.log('resizing')
  document.querySelector('.segment--third')?.innerHTML = document.querySelector('.segment--third').textContent
})

const Transitions = {
  default: DefaultTransition,
  homeToWork: HomeToWorkTransition,
  homeToWriting: HomeToWritingTransition,
  workToHome: WorkToHomeTransition,
  writingToHome: WritingToHomeTransition,
  writingToArticle: WritingToArticleTransition,
  articleToWriting: ArticleToWritingTransition,
};

class DefaultRenderer extends Renderer {
  onEnter() {
    navManager.updateLink();
    if (window.location.pathname === '/') {
      navManager.hide();
      document.body.classList.add('home');
    } else {
      navManager.show();
      document.body.classList.remove('home');
    }

    if (document.querySelector('[data-tag="currentTime"]')) {
      new Clock(document.querySelector('[data-tag="currentTime"]'));
    }
    if (document.querySelector('.home-hero__marquee')) {
      new Marquee({
        wrapperEl: document.querySelector('.home-hero__marquee'),
        listEl: document.querySelector('.home-hero__marquee-inner'),
      });
    }
    if (document.querySelector('.home-about__marquee')) {
      new Marquee({
        wrapperEl: document.querySelector('.home-about__marquee'),
        listEl: document.querySelector('.home-about__marquee-inner'),
      });
    }
  }

  onEnterCompleted() {}

  onLeave() {}

  onLeaveCompleted() {}
}

const taxi = new Core({
  allowInterruption: true,
  links: 'a[href]:not([target]):not([href^="#"]):not([data-taxi-ignore])',
  renderers: {
    default: DefaultRenderer,
  },
  transitions: Transitions,
  reloadJsFilter: (element) =>
    element.dataset.taxiReload !== undefined ||
    element.src.includes('codepen.io'),
});
// taxi.addRoute('.*', '\/work\/', 'homeToWork');
taxi.addRoute('/', '/work', 'homeToWork');
taxi.addRoute('/', '/(writing|notes)', 'homeToWriting');
taxi.addRoute(`\/work`, '', 'workToHome');
taxi.addRoute(`\/(writing|notes)`, '', 'writingToHome');
taxi.addRoute(`\/(writing|notes)`, `\/(writing|notes)\/.*`, 'writingToArticle');
taxi.addRoute(`\/(writing|notes)\/.*`, `\/(writing|notes)`, 'articleToWriting');
// taxi.addRoute('/work', '/', 'homeToWork');

// taxi.addRoute('/', '/work/', 'homeToWork');
// taxi.addRoute('/work', '.*', 'work');

// import SessionManager from "./utils/SessionManager.js";
// const taxi = new Core()

// import headerTl from "./animations/homepage.js";

// const sessionManager = new SessionManager();

// console.log(sessionManager.pathIsVisited())

// if (!sessionManager.pathIsVisited()) {
//     if (window.location.pathname === '/') {
//         // headerTl.play
//     }
// }
// sessionManager.mount();


