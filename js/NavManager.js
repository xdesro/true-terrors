import gsap from "gsap";

const hidingNav = (nav) => {
  const tl = gsap.timeline({ paused: true });
  tl.fromTo(
    nav.querySelectorAll(":scope > *"),
    {
      opacity: 1,
      y: 0,
    },
    {
      y: "-100%",
      ease: "power3.in",
      opacity: 0,
      duration: 0.3,
    }
  );

  return tl;
};

export default class NavManager {
  constructor() {
    this.nav = document.querySelector(".page-nav");

    this.hidingNav = hidingNav(this.nav);

    this.init();

    // this.mount();
  }
  init() {
    if (window.location.pathname === "/") {
      this.hidingNav.seek(1);
    } else {
      this.hidingNav.seek(0);
      this.hidingNav.reversed(true);
    }
  }
  hide() {
    this.hidingNav.play();
    // console.log(this.hidingNav.reversed(), this.hidingNav.progress())
  }
  show() {
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
    const backLink = this.nav.querySelector(".page-nav__back-link");
    const backLinkText = backLink.querySelector("span");
    const newDataEl = document.querySelector("#page-nav-data");
    if (!newDataEl) {
      return;
    }
    const newData = JSON.parse(newDataEl.textContent);

    if (backLinkText.textContent.toLowerCase() === newData.backLinkText.toLowerCase()) {
      return;
    } else {
      tl.to(backLinkText, {
        opacity: 0,
        duration: 0.3,
        x: "-100%",
        ease: "power3.in",
        clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
        onComplete() {
          backLink.setAttribute("href", newData.backLink);
          backLinkText.textContent = newData.backLinkText;
        },
      }).to(backLinkText, {
        opacity: 1,
        ease: "power3.out",
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        x: 0,
        duration: 0.3,
      });
    }
  }
}
