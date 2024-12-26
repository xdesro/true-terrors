import { Core, Renderer } from '@unseenco/taxi';

import NavManager from './NavManager';
import MatchMediaManager from './MatchMediaManager';
import Marquee from './Marquee';
import Clock from './Clock';

import DefaultTransition from './transitions/Default';
// import HomeToWorkTransition from './routes/HomeToWork';
// import WorkToHomeTransition from './routes/WorkToHome';
// import HomeToWritingTransition from './routes/HomeToWriting';
// import WritingToHomeTransition from './routes/WritingToHome';
// import WritingToArticleTransition from './routes/WritingToArticle';
// import ArticleToWritingTransition from './routes/ArticleToWriting';
// import WritingToWritingTransition from './routes/WritingToWriting';
// import WorkToCaseTransition from './routes/WorkToCase';
// import ArticleToHomeTransition from './routes/ArticleToHome';

window.navManager = new NavManager();
history.scrollRestoration = 'manual';

window.mediaQueries = {};
MatchMediaManager.add(({ conditions }) => {
  Object.assign(window.mediaQueries, conditions);
  console.log(window.mediaQueries);
});
console.log('test');
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
  onLeaveCompleted() {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  }
}
const taxi = new Core({
  allowInterruption: true,
  links: 'a[href]:not([target]):not([href^="#"]):not([data-taxi-ignore])',
  renderers: {
    default: DefaultRenderer,
  },
  transitions: {},
  reloadJsFilter: (element) =>
    element.dataset.taxiReload !== undefined ||
    element.src.includes('codepen.io'),
});

async function loadTransitions() {
  return {
    default: DefaultTransition,
    homeToWork: (await import('./routes/HomeToWork')).default,
    homeToWriting: (await import('./routes/HomeToWriting')).default,
    workToHome: (await import('./routes/WorkToHome')).default,
    workToCase: (await import('./routes/WorkToCase')).default,
    writingToHome: (await import('./routes/WritingToHome')).default,
    writingToArticle: (await import('./routes/WritingToArticle')).default,
    articleToWriting: (await import('./routes/ArticleToWriting')).default,
    writingToWriting: (await import('./routes/WritingToWriting')).default,
    articleToHome: (await import('./routes/ArticleToHome')).default,
  };
}
(async () => {
  const Transitions = await loadTransitions();
  console.log(Transitions);

  for (const transitionName in Transitions) {
    taxi.transitions[transitionName] = Transitions[transitionName];
  }
  taxi.setDefaultTransition('default');
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
  taxi.addRoute(`\/(writing|notes)\/.*`, ``, 'articleToHome');
})();
