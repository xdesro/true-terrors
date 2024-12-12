import gsap from "gsap";

export default class NavManager {
  constructor() {
    this.nav = document.querySelector(".page-nav");
    this.backLink = this.nav.querySelector(".page-nav__back-link");
    this.backLinkText = this.backLink.querySelector("span");

    this.init();

    this.newDataEl = document.querySelector("#page-nav-data");
    if (!this.newDataEl) {
      return;
    }
    this.newData = JSON.parse(this.newDataEl.textContent);
    this.mount();
  }
  init() {
    if (window.location.pathname === "/") {
      this.nav.classList.add("page-nav--hidden");
    } else {
      this.nav.classList.remove("page-nav--hidden");
    }
  }
  mount() {
    const { backLink, backLinkText, newData } = this;
    const tl = gsap.timeline();

    tl.to(this.backLinkText, {
      opacity: 0,
      duration: 0.2,
      x: "-50%",
      onComplete() {
        backLink.setAttribute("href", newData.backLink);
        backLinkText.textContent = newData.backLinkText;
      },
    }).to(this.backLinkText, {
      opacity: 1,
      duration: 0.2,
      x: 0,
    });
  }
}
