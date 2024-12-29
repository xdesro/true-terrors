import gsap from 'gsap';
const INIT_SCALE_FACTOR = 0.4;
export default class Marquee {
  constructor({ wrapperEl, listEl, items, reverse = false }) {
    this.wrapperEl = wrapperEl;
    this.listEl = listEl;
    this.items = this.listEl.children;
    // this.items = this.wrapperEl.children;
    //   this.listEl = listEl;
    //   this.items = items;
    this.reverse = reverse;
    this.scaleFactor = INIT_SCALE_FACTOR;

    this.leftSideOfContainer = this.wrapperEl.getBoundingClientRect().left;

    this.currentLeftValue = 0;

    this.init();
    this.addListeners();
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
  handleHover() {}
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
    //       marquees.forEach((marquee) => {
    //         marquee.handleResize;
    //       });
    //     });
  }
}
//   document.addEventListener('DOMContentLoaded', (e) => {
//     const marqueeEls = [...document.querySelectorAll('.marquee')];
//     const marquees = marqueeEls.map((marquee) => {
//       return new Marquee({
//         wrapperEl: marquee,
//         listEl: marquee.querySelector('.marquee__inner'),
//         items: [...marquee.querySelectorAll('.marquee__inner > *')],
//         reverse: marquee.dataset.reverse,
//       });
//     });

//     window.addEventListener('resize', (e) => {
//       marquees.forEach((marquee) => {
//         marquee.handleResize;
//       });
//     });
//   });
