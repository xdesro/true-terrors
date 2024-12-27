import { Core, Renderer } from '@unseenco/taxi';

import NavManager from './NavManager';
import MatchMediaManager from './MatchMediaManager';
import Marquee from './Marquee';
import Clock from './Clock';

import { updateFooterBreadcrumbs } from './utils/updateFooterBreadcrumbs';

import DefaultTransition from './transitions/Default';

window.navManager = new NavManager();
history.scrollRestoration = 'manual';

window.mediaQueries = {};
MatchMediaManager.add(({ conditions }) => {
  Object.assign(window.mediaQueries, conditions);
});
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

    updateFooterBreadcrumbs();
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
  transitions: {
    default: DefaultTransition,
  },
  reloadJsFilter: (element) =>
    element.dataset.taxiReload !== undefined ||
    element.src.includes('codepen.io'),
});

taxi.setDefaultTransition('default');

async function loadTransitions() {
  return {
    articleToArticle: (await import('./routes/ArticleToArticle')).default,
    articleToHome: (await import('./routes/ArticleToHome')).default,
    articleToWriting: (await import('./routes/ArticleToWriting')).default,
    default: DefaultTransition,
    homeToArticle: (await import('./routes/HomeToArticle')).default,
    homeToCase: (await import('./routes/HomeToCase')).default,
    homeToWork: (await import('./routes/HomeToWork')).default,
    homeToWriting: (await import('./routes/HomeToWriting')).default,
    workToCase: (await import('./routes/WorkToCase')).default,
    workToHome: (await import('./routes/WorkToHome')).default,
    writingToHome: (await import('./routes/WritingToHome')).default,
    writingToArticle: (await import('./routes/WritingToArticle')).default,
    writingToWriting: (await import('./routes/WritingToWriting')).default,
  };
}
(async () => {
  const Transitions = await loadTransitions();
  for (const transitionName in Transitions) {
    taxi.transitions[transitionName] = Transitions[transitionName];
  }
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
  taxi.addRoute(
    `\/(writing|notes)\/.*`,
    `\/(writing|notes)\/.*`,
    'articleToArticle'
  );
  taxi.addRoute(`/`, `\/(writing|notes)\/.*`, 'homeToArticle');
  taxi.addRoute(`/`, `\/work\/.*`, 'homeToCase');
})();
