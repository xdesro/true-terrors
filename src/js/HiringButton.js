import gsap from 'gsap';
import MatchMediaManager from './MatchMediaManager';

export default class HiringButton {
  constructor() {
    this.button = document.querySelector('.hire-me');
    this.idleTimeScale = 1;
    gsap.set('.hire-me__ring, .hire-me__crown, .hire-me__field', {
      transformOrigin: '50% 50%',
    });
    MatchMediaManager.add(({ conditions }) => {
      const { prefersReducedMotion } = conditions;
      this.idleTl = gsap
        .timeline({
          repeat: -1,
          repeatDelay: 0,
          defaults: {
            duration: prefersReducedMotion ? 0 : 60,
            ease: 'linear',
          },
        })
        .to('.hire-me__ring', {
          rotate: 360,
        })
        .to(
          '.hire-me__crown',
          {
            rotate: -360,
          },
          0
        );

      this.focusTl = gsap
        .timeline({
          paused: true,
          defaults: {
            duration: prefersReducedMotion ? 0 : 1,
            ease: 'power2.inOut',
          },
        })
        .to('.hire-me__ring', {
          scale: 0.8,
          fill: '#fafafa',
        })
        .to(
          '.hire-me__crown',
          {
            scale: 0.9,
          },
          0
        )
        .to(
          '.hire-me__field',
          {
            scale: 1.1,
          },
          0
        );
    });

    this.addListeners();
  }
  addListeners() {
    const anchor = this.button.parentElement;
    anchor.addEventListener('mouseover', (e) => {
      gsap.to(this, {
        idleTimeScale: 6,
        onUpdate: () => {
          this.idleTl.timeScale(this.idleTimeScale);
        },
      });
      this.focusTl.play();
    });
    anchor.addEventListener('blur', () => {
      gsap.to(this, {
        idleTimeScale: 1,
        onUpdate: () => {
          this.idleTl.timeScale(this.idleTimeScale);
        },
      });
      this.focusTl.reverse();
    });
    anchor.addEventListener('mouseout', (e) => {
      gsap.to(this, {
        idleTimeScale: 1,
        onUpdate: () => {
          this.idleTl.timeScale(this.idleTimeScale);
        },
      });
      this.focusTl.reverse();
    });
  }
}
