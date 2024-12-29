import { createNoise2D } from 'simplex-noise';
import mapRange from './utils/mapRange';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MatchMediaManager from './MatchMediaManager';

gsap.registerPlugin(ScrollTrigger);

const noise2D = createNoise2D();

class CaseWaterfall {
  constructor() {
    this.el = document.querySelector('.case-study-rows');
    this.rows = this.el.querySelectorAll('.case-study-row');

    this.init();
  }
  getWavedCoords(idx) {
    return mapRange(
      noise2D(0, idx),
      0,
      1,
      -window.innerWidth * 0.75,
      window.innerWidth * 0.75
    );
  }

  init() {
    this.rows.forEach((row, idx) => {
      row.style.setProperty('--factor', 0.3);
      const rowTitle = row.querySelector('.case-study-row__title');
      const rowLogo = row.querySelector('.case-study-row__logo');
      const rowTitleWidth = rowTitle.getBoundingClientRect().width;
      const rowLogoWidth = rowLogo.getBoundingClientRect().width;

      if (row.classList.contains('case-study-row--coming-soon')) {
        row.style.setProperty('--coming-soon-width', `${rowTitleWidth}px`);
      }

      const wavedCoords = this.getWavedCoords(idx);

      row.style.paddingLeft = 0;
      MatchMediaManager.add(({ conditions }) => {
        const { isMobile } = conditions;
        row.style.transform = isMobile
          ? `translateX(calc(${wavedCoords}px * var(--factor)))`
          : `translateX(calc((${wavedCoords}px + ${
              window.innerWidth / 2
            }px) * var(--factor) - ${rowTitleWidth / 2}px + ${
              window.innerWidth / 2
            }px - ${rowLogoWidth}px))`;
      });
    });

    this.animate();
  }
  animate() {
    this.rows.forEach((row) => {
      gsap
        .timeline({
          autoRemoveChildren: true,
        })
        .to(row, {
          '--factor': mapRange(
            Math.abs(
              0,
              row.getBoundingClientRect().top - window.innerHeight / 2
            ),
            0,
            window.innerHeight / 2,
            0,
            0.3
          ),
          duration: 2,
          scrollTrigger: {
            trigger: row,
            start: 'bottom bottom',
            end: 'top center',
            scrub: 1,
          },
        })
        .to(row, {
          opacity: 0,
          scrollTrigger: {
            trigger: row,
            start: 'top top+=100',
            end: 'bottom top',
            scrub: 1,
          },
        });
    });
  }
}
new CaseWaterfall();
