import gsap from 'gsap';
export default class Marquee {
  constructor(element, duration = 20) {
    this.marquee = element;
    this.duration = duration;
    this.tween = null;
    this.init();
  }

  init() {
    const marqueeContent = this.marquee.querySelector('[data-marquee-inner]');
    if (!marqueeContent) {
      console.error('Marquee inner content not found for', this.marquee);
      return;
    }
    this.marqueeContent = marqueeContent;
    this.marqueeContentClone = marqueeContent.cloneNode(true);
    this.marquee.appendChild(this.marqueeContentClone);

    this.playMarquee();

    this.setupEventListeners();
  }

  calculateTranslationDistance() {
    const originalWidth = this.marqueeContent.offsetWidth;
    return -1 * originalWidth; // Translate the full width of the original content
  }

  playMarquee() {
    const progress = this.tween ? this.tween.progress() : 0;

    if (this.tween) {
      this.tween.progress(0).kill();
    }

    const distanceToTranslate = this.calculateTranslationDistance();

    this.tween = gsap.fromTo(
      this.marquee.children,
      { x: 0 },
      {
        x: distanceToTranslate,
        duration: this.duration,
        ease: 'none',
        repeat: -1,
      }
    );

    this.tween.progress(progress);
  }

  setupEventListeners() {
    const debounce = (func, delay = 500) => {
      let timer;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
      };
    };

    const handleResize = debounce(() => this.playMarquee());
    window.addEventListener('resize', handleResize);

    this.marquee.addEventListener('mouseover', () => {
      if (this.tween) this.tween.timeScale(0.2);
    });

    this.marquee.addEventListener('mouseout', () => {
      if (this.tween) this.tween.timeScale(1);
    });
  }
}
