import { Core, Renderer } from '@unseenco/taxi';
import gsap from 'gsap';

import NavManager from './NavManager';
import MatchMediaManager from './MatchMediaManager';
import Marquee from './Marquee';
import Clock from './Clock';

import DefaultTransition from './transitions/Default';
import HomeToWorkTransition from './routes/HomeToWork';
import WorkToHomeTransition from './routes/WorkToHome';
import HomeToWritingTransition from './routes/HomeToWriting';
import WritingToHomeTransition from './routes/WritingToHome';
import WritingToArticleTransition from './routes/WritingToArticle';
import ArticleToWritingTransition from './routes/ArticleToWriting';
import WritingToWritingTransition from './routes/WritingToWriting';
import WorkToCaseTransition from './routes/WorkToCase';

window.navManager = new NavManager();
history.scrollRestoration = 'auto';

// A utility function to create and configure matchMedia
const breakpoints = {
  tablet: 600,
  desktop: 900,
};

mm.add(
  {
    isMobile: `(max-width: ${breakpoints.tablet - 1}px)`,
    isTablet: `(min-width: ${breakpoints.tablet}px) and (max-width: ${
      breakpoints.desktop - 1
    }px)`,
    isDesktop: `(min-width: ${breakpoints.desktop}px)`,
    prefersReducedMotion: '(prefers-reduced-motion: reduce)',
  },
  () => {}
);

const Transitions = {
  default: DefaultTransition,
  homeToWork: HomeToWorkTransition,
  homeToWriting: HomeToWritingTransition,
  workToHome: WorkToHomeTransition,
  workToCase: WorkToCaseTransition,
  writingToHome: WritingToHomeTransition,
  writingToArticle: WritingToArticleTransition,
  articleToWriting: ArticleToWritingTransition,
  writingToWriting: WritingToWritingTransition,
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
MatchMediaManager.add(({ conditions }) => {
  if (!conditions.prefersReducedMotion) {
    taxi.addRoute('/', '/work', 'homeToWork');
    taxi.addRoute('/', '/(writing|notes)', 'homeToWriting');
    taxi.addRoute(`\/work`, '', 'workToHome');
    taxi.addRoute(`\/work`, `\/work\/.*`, 'workToCase');
    taxi.addRoute(`\/(writing|notes)`, '', 'writingToHome');
    taxi.addRoute(
      `\/(writing|notes)`,
      `\/(writing|notes)\/.*`,
      'writingToArticle'
    );
    taxi.addRoute(
      `\/(writing|notes)\/.*`,
      `\/(writing|notes)`,
      'articleToWriting'
    );
    taxi.addRoute(`\/(writing|notes)`, `\/(writing|notes)`, 'writingToWriting');
  }
});

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
