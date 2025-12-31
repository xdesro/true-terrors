import { Core, Renderer } from '@unseenco/taxi';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

import MatchMediaManager from './MatchMediaManager';
import NavManager from './NavManager';

import { updateFooterBreadcrumbs } from './utils/updateFooterBreadcrumbs';

import DefaultTransition from './transitions/Default';

import graffiti, { aSecretMessage } from './graffiti';

const fetchSpotify = () =>
  fetch('https://henry.codes/.netlify/functions/spotify')
    .then((res) => res.json())
    .then((data) => {
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
    .catch((err) => {
      console.error(err);
    });

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
    console.log(graffiti, 'color: #666');
    console.log(aSecretMessage);
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

    if (window.location.pathname === '/') {
      navManager.hide(true);
    }

    if (document.querySelector('.home-work__title')) {
      MatchMediaManager.add(({ conditions }) => {
        const { prefersReducedMotion } = conditions;
        gsap.from('.home-work__title', {
          '--banner-scale': prefersReducedMotion ? 1 : 0,

          scrollTrigger: {
            trigger: '.home-work__title',
            start: 'top bottom',
            end: 'bottom center',
            scrub: 2,
          },
        });
      });
    }
    if (document.querySelector('.home-articles__title')) {
      MatchMediaManager.add(({ conditions }) => {
        const { prefersReducedMotion } = conditions;
        gsap.from('.home-articles__title', {
          '--banner-scale': prefersReducedMotion ? 1 : 0,
          scrollTrigger: {
            trigger: '.home-articles__title',
            start: 'top bottom',
            end: 'bottom center',
            scrub: 2,
          },
        });
      });
    }
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
      import('./DitheredImage')
        .then(({ default: DitheredImage }) => {
          ditheredImages.push(
            new DitheredImage({
              img: document.querySelector('.article-header__image'),
              wrapper: document.querySelector(
                '.article-header__graphic-wrapper'
              ),
            })
          );
        })
        .catch((error) => {
          console.error('Failed to load the CaseBlocks module:', error);
        });
    } else {
      ditheredImages.forEach((imageClass) => {
        imageClass.removeListeners();
      });
    }
    if (document.querySelector('.cases-block-list')) {
      import('./CaseBlocks')
        .then(({ default: CaseBlocks }) => {
          caseBlocks = new CaseBlocks();
        })
        .catch((error) => {
          console.error('Failed to load the CaseBlocks module:', error);
        });
      if (caseBlocks) {
        caseBlocks.mount();
        caseBlocks.addListeners();
      }
    } else {
      if (caseBlocks) {
        caseBlocks.removeListeners();
      }
    }
    if (document.querySelector('.links-list')) {
      import('./LinksSigil')
        .then(({ default: LinksSigil }) => {
          new LinksSigil();
        })
        .catch((error) => {
          console.error('Failed to load the LinksSigil module:', error);
        });
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
      import('./CaseWaterfall')
        .then(({ default: CaseWaterfall }) => {
          new CaseWaterfall();
        })
        .catch((error) => {
          console.error('Failed to load the CaseWaterfall module:', error);
        });
    }
    if (document.querySelector('[data-tag="currentTime"]')) {
      import('./Clock')
        .then(({ default: Clock }) => {
          const clocks = document.querySelectorAll('[data-tag="currentTime"]');
          clocks.forEach((clockElement) => {
            const clockMachine = new Clock(clockElement);
            clockMachine.updateTime();
          });
        })
        .catch((error) => {
          console.error('Failed to load the Clock module:', error);
        });
    }
    if (
      document.querySelector(
        '.article-block, .case-study-block, .card:has(> a)'
      )
    ) {
      import('./utils/linkifyCards')
        .then(({ default: linkifyCards }) => {
          linkifyCards('.article-block, .case-study-block, .card:has(> a)');
        })
        .catch((error) => {
          console.error('Failed to load the Card Linkifier module:', error);
        });
    }
    if (document.querySelector('[data-marquee]')) {
      import('./Marquee')
        .then(({ default: Marquee }) => {
          const marquees = document.querySelectorAll('[data-marquee]');
          marquees.forEach((marqueeElement) => {
            new Marquee(marqueeElement);
          });
        })
        .catch((error) => {
          console.error('Failed to load the Marquee module:', error);
        });
    }
    if (document.querySelector('.footer-border')) {
      import('./FooterShader').then(({ default: FooterShader }) => {
        new FooterShader();
      });
    }
    updateFooterBreadcrumbs();
  }
  onEnterCompleted() {}
  onLeave() {
    if (window.gui) {
      window.gui.destroy();
      delete window.gui;
    }
  }
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

const loadTransitions = async () => ({
  articleToArticle: (await import('./routes/ArticleToArticle')).default,
  articleToHome: (await import('./routes/ArticleToHome')).default,
  articleToWriting: (await import('./routes/ArticleToWriting')).default,
  articleToWriting: (await import('./routes/ArticleToWriting')).default,
  caseToWork: (await import('./routes/CaseToWork')).default,
  caseToHome: (await import('./routes/CaseToHome')).default,
  default: DefaultTransition,
  homeToArticle: (await import('./routes/HomeToArticle')).default,
  homeToAWebsiteToDestroy: (await import('./routes/HomeToAWebsiteToDestroy'))
    .default,
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
  taxi.addRoute(
    '*',
    '/writing/a-website-to-destroy-all-websites',
    'homeToAWebsiteToDestroy'
  );
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
