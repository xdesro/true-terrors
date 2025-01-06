import { Core, Renderer } from '@unseenco/taxi';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import CaseWaterfall from './CaseWaterfall';
import Clock from './Clock';
import DitheredImage from './DitheredImage';
import Marquee from './Marquee';
import MatchMediaManager from './MatchMediaManager';
import NavManager from './NavManager';

import { updateFooterBreadcrumbs } from './utils/updateFooterBreadcrumbs';

import DefaultTransition from './transitions/Default';
import CaseBlocks from './CaseBlocks';
import graffiti from './graffiti';
import { HomeEntranceTransition } from './transitions/Home';

const fetchSpotify = () =>
  fetch('/.netlify/functions/spotify')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const trackEls = document.querySelectorAll('.spotify-widget__track');
      const artistsEls = document.querySelectorAll('.spotify-widget__artists');

      trackEls.forEach((trackEl) => {
        trackEl.setAttribute('href', data.url);
        trackEl.textContent = data.name;
      });

      artistsEls.forEach((artistEl) => {
        artistEl.innerHTML = `${data.artists
          .map((artist) => artist.name)
          .join(', ')}`;
      });
    })
    .catch();

window.navManager = new NavManager();
history.scrollRestoration = 'manual';

window.mediaQueries = {};
MatchMediaManager.add(({ conditions }) => {
  Object.assign(window.mediaQueries, conditions);
});

const ditheredImages = [];
let caseBlocks = null;

class DefaultRenderer extends Renderer {
  initialLoad() {
    window.addEventListener('keypress', ({ shiftKey, key }) => {
      if (shiftKey && key === 'D') {
        document.body.classList.toggle('themed');
        document.body.classList.toggle('dark');
      }
      if (shiftKey && key === 'G') {
        document.body.classList.toggle('with-grid');
      }
    });
    fetchSpotify();
    this.onEnter();
  }
  onEnter() {
    navManager.updateLink();
    if (window.location.pathname === '/') {
      navManager.hide();
      document.body.classList.add('home');
      MatchMediaManager.add(({ conditions }) => {
        const { prefersReducedMotion, isMobile } = conditions;
        gsap.from('.home-about__title-inner', {
          x: prefersReducedMotion || isMobile ? 0 : '50vw',
          scrollTrigger: {
            trigger: '.home-about__title',
            start: 'top bottom',
            end: 'bottom center',
            scrub: 2,
          },
        });
      });
    } else {
      if (navManager.hidingNav.progress() > 0) {
        navManager.show();
      }
      document.body.classList.remove('home');
    }
    if (document.querySelector('.article-header__graphic-wrapper')) {
      ditheredImages.push(
        new DitheredImage({
          img: document.querySelector('.article-header__image'),
          wrapper: document.querySelector('.article-header__graphic-wrapper'),
        })
      );
    } else {
      ditheredImages.forEach((imageClass) => {
        imageClass.removeListeners();
      });
    }
    if (document.querySelector('.cases-block-list')) {
      if (caseBlocks) {
        caseBlocks.mount();
        caseBlocks.addListeners();
      } else {
        caseBlocks = new CaseBlocks();
      }
    } else {
      if (caseBlocks) {
        caseBlocks.removeListeners();
      }
    }
    if (document.querySelector('.page-header__bar, .barb-bar')) {
      MatchMediaManager.add(({ conditions }) => {
        const { prefersReducedMotion, isMobile } = conditions;
        gsap.to('.page-header__bar, .barb-bar', {
          backgroundPositionX: prefersReducedMotion ? 0 : '100%',
          scrollTrigger: {
            target: '.page-header',
            scrub: 1,
          },
        });
      });
    }
    if (document.querySelector('.case-study-rows')) {
      new CaseWaterfall();
    }
    if (document.querySelector('[data-tag="currentTime"]')) {
      const clocks = document.querySelectorAll('[data-tag="currentTime"]');
      clocks.forEach((clock) => {
        new Clock(clock);
      });
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

    if (document.querySelector('.article-block, .case-study-block')) {
      const cards = document.querySelectorAll(
        '.article-block, .case-study-block, .card:has(> a)'
      );
      cards.forEach((card) => {
        let downTime;

        const link = card.querySelector('a');
        if (link) {
          if (card.classList.contains('article-block')) {
            card.classList.add('article-block--clickable');
          } else if (card.classList.contains('case-study-block')) {
            card.classList.add('case-study-block--clickable');
          } else {
            card.classList.add('card--clickable');
          }

          card.addEventListener('mousedown', () => {
            downTime = Date.now();
          });

          card.addEventListener('mouseup', () => {
            const upTime = Date.now();
            if (upTime - downTime < 200) {
              link.click();
            }
          });
        }
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
  links: 'a[href]:not([target]):not([data-taxi-ignore])',
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

const loadTransitions = async () => ({
  articleToArticle: (await import('./routes/ArticleToArticle')).default,
  articleToHome: (await import('./routes/ArticleToHome')).default,
  articleToWriting: (await import('./routes/ArticleToWriting')).default,
  articleToWriting: (await import('./routes/ArticleToWriting')).default,
  caseToWork: (await import('./routes/CaseToWork')).default,
  caseToHome: (await import('./routes/CaseToHome')).default,
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
});

(async () => {
  const Transitions = await loadTransitions();
  for (const transitionName in Transitions) {
    taxi.transitions[transitionName] = Transitions[transitionName];
  }
  taxi.addRoute('/', '/work', 'homeToWork');
  taxi.addRoute('/', '/(writing|notes)', 'homeToWriting');
  taxi.addRoute(`\/work`, '', 'workToHome');
  taxi.addRoute(`\/work`, `\/work\/.*`, 'workToCase');
  taxi.addRoute(`\/work\/.*`, `\/work`, 'caseToWork');
  taxi.addRoute(`/`, `\/work\/.*`, 'homeToCase');
  taxi.addRoute(`/`, `\/(writing|notes)\/.*`, 'homeToArticle');
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
  taxi.addRoute(`\/work\/.*`, ``, 'caseToHome');
  taxi.addRoute(
    `\/(writing|notes)\/.*`,
    `\/(writing|notes)\/.*`,
    'articleToArticle'
  );
  // TODO dont fade for RSS links
  // taxi.addRoute(`.*`, `\/(rss)\/.*`, false);
})();
