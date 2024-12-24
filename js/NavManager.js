import gsap from 'gsap';

const hideNav = (nav) => {
  const tl = gsap
    .timeline({
      paused: true,
    })
    .fromTo(
      nav,
      {
        opacity: 1,
      },
      {
        opacity: 0,
        ease: 'linear',
        duration: 0.2,
      }
    );
  return tl;
};

export default class NavManager {
  constructor() {
    this.nav = document.querySelector('.page-nav');
    this.hidingNav = hideNav(this.nav);

    this.init();
  }
  init() {
    if (window.location.pathname === '/') {
      this.hidingNav.seek(1);
    } else {
      this.hidingNav.seek(0);
      this.hidingNav.reversed(true);
    }
  }
  hide() {
    this.nav.classList.add('page-nav--inert');
    this.hidingNav.timeScale(1.5);
    this.hidingNav.play();
  }
  show() {
    this.nav.classList.remove('page-nav--inert');
    this.hidingNav.timeScale(1);

    const isReversed = this.hidingNav.reversed();
    const isAtStart = this.hidingNav.progress() === 0;

    if (isReversed && isAtStart) {
      return;
    } else {
      this.hidingNav.reverse(0);
    }
  }
  updateLink() {
    const tl = gsap.timeline();
    const backLink = this.nav.querySelector('.page-nav__back-link');
    const backLinkText = backLink.querySelector('span');
    const newDataEl = document.querySelector('#page-nav-data');
    if (!newDataEl) {
      return;
    }
    const newData = JSON.parse(newDataEl.textContent);

    if (
      backLinkText.textContent.toLowerCase() ===
      newData.backLinkText.toLowerCase()
    ) {
      return;
    } else {
      const { prefersReducedMotion } = mediaQueries;

      tl.to(backLinkText, {
        opacity: 0,
        duration: prefersReducedMotion ? 0.2 : 0.3,
        x: prefersReducedMotion ? null : '-100%',
        ease: prefersReducedMotion ? 'linear' : 'power3.in',
        clipPath: prefersReducedMotion
          ? null
          : 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
        onComplete() {
          backLink.setAttribute('href', newData.backLink);
          backLinkText.textContent = newData.backLinkText;
        },
      }).to(backLinkText, {
        opacity: 1,
        ease: prefersReducedMotion ? 'linear' : 'power3.out',
        clipPath: prefersReducedMotion
          ? null
          : 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        x: 0,
        duration: prefersReducedMotion ? 0.2 : 0.3,
      });
    }
  }
}
