import gsap from 'gsap';
import MatchMediaManager from './MatchMediaManager';
const INIT_SCALE_FACTOR = 0.4;
export default class Marquee {
  constructor({ wrapperEl, listEl, items, reverse = false }) {
    this.wrapperEl = wrapperEl;
    this.listEl = listEl;
    this.items = this.listEl.children;
    this.reverse = reverse;
    this.scaleFactor = INIT_SCALE_FACTOR;

    this.leftSideOfContainer = this.wrapperEl.getBoundingClientRect().left;

    this.currentLeftValue = 0;

    this.init();
    this.addListeners();

    // this.scaleFactor = 0;
  }
  init() {
    this.animationLoop();
  }
  animationLoop() {
    const firstListItem = this.listEl.querySelector('*:first-child');
    let rightSideOfFirstItem = firstListItem.getBoundingClientRect().right;

    if (rightSideOfFirstItem <= this.leftSideOfContainer) {
      this.currentLeftValue = -1;
      this.listEl.appendChild(firstListItem);
    }
    this.listEl.style.transform = `translateX(${this.currentLeftValue}px)`;

    this.currentLeftValue -= 1 * this.scaleFactor;

    requestAnimationFrame(this.animationLoop.bind(this));
  }
  handleResize() {
    this.leftSideOfContainer = this.wrapperEl.getBoundingClientRect().left;
  }
  addListeners() {
    const { handleResize } = this;
    window.addEventListener('resize', this.handleResize.bind(this));
    this.wrapperEl.addEventListener('mouseover', (e) => {
      gsap.to(this, {
        scaleFactor: 0.05,
      });
    });
    this.wrapperEl.addEventListener('mouseout', (e) => {
      gsap.to(this, {
        scaleFactor: INIT_SCALE_FACTOR,
      });
    });
  }
}
