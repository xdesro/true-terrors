import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

import { SCENES } from './js/scenes';
import NightSky from './js/NightSky';
import Clock from './js/Clock';
import {
  getAxialPrecessionAtTime,
  getCelestialBodiesPaths,
  lerp,
} from './js/utils';
import heroTimeline from './js/animations/hero';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MotionPathPlugin);

const UNIFORMS = {
  bgColor: SCENES.default.sky,
  starColor: SCENES.default.starColor,
  starSize: 0.05,
  starDensity: 15.0,
  twinkleBrightness: 0.8,
  twinkleSpeed: 3.0,
  panSpeed: getAxialPrecessionAtTime('December 31 2024, 7:30:24 PM'),
};

const canvas = document.querySelector('.stars');
const sceneSetters = document.querySelectorAll('[data-set-scene]');
const hoverImagesTargets = document.querySelectorAll('.hover');
const hoverImagesContainer = document.querySelector('.hover-images');
const hoverImages = document.querySelectorAll('.hover-image');

const gl = canvas.getContext('webgl');
const nightSky = new NightSky(gl);
const clock = new Clock({ el: document.querySelector('.clock') });

heroTimeline();

document.querySelectorAll('[data-hide-clock]').forEach((el, i) => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top center+=200px',
        end: 'top center',
        scrub: 1,
        fastScrollEnd: true,
      },
    })
    .fromTo(
      '.clock',
      {
        opacity: 1,
      },
      {
        opacity: 0,
      },
    );
});

import MatchMediaManager from '../../js/MatchMediaManager';
MatchMediaManager.add(({ conditions }) => {
  const { isMobile, isTablet, isDesktop, prefersReducedMotion } = conditions;
  const scenesTl = gsap.timeline({ paused: true });
  sceneSetters.forEach((scene, i) => {
    const themeToSet = scene.dataset.setScene;
    const sceneToSet = SCENES[themeToSet];
    const propsToSet = {};

    if (sceneToSet.sky) propsToSet.bgColor = sceneToSet.sky;
    if (sceneToSet.panSpeed) propsToSet.panSpeed = sceneToSet.panSpeed;
    if (sceneToSet.starColor) propsToSet.starColor = sceneToSet.starColor;
    if (sceneToSet.dateTime && !isMobile && !prefersReducedMotion)
      propsToSet.panSpeed = getAxialPrecessionAtTime(sceneToSet.dateTime);

    const tl = gsap
      .timeline({
        scrollTrigger: {
          trigger: scene,
          start: 'top center+=200px',
          end: 'top center',
          scrub: 1,
          fastScrollEnd: true,
        },
      })
      .to(
        UNIFORMS,
        {
          ...propsToSet,
          ease: 'power4.inOut',
          duration: 1,
        },
        '<',
      );

    if (sceneToSet.text) {
      tl.to(
        '.article-content',
        {
          color: sceneToSet.text,
        },
        '<',
      );
    }
    if (sceneToSet.clock) {
      tl.to(
        '.clock',
        {
          color: sceneToSet.clock,
        },
        '<',
      );
    }
    if (sceneToSet.dateTime) {
      tl.to(
        clock,
        {
          currentTime() {
            const offsetMs = 300 * 60000; // timezone offset * ms in 1m
            return (
              (new Date(sceneToSet.dateTime).getTime() + offsetMs) % 86400000
            );
          },
          onUpdate: () => {
            clock.el.textContent = clock.msToTime(clock.currentTime);
          },
          onStart: function () {
            if (!clock.isRunning) clock.start();
          },
        },
        '<',
      );
    }
    if (sceneToSet.sky) {
      tl.to(
        document.documentElement,
        {
          '--color-sky': sceneToSet.sky,
        },
        '<',
      );
    }

    scenesTl.add(tl);
  });
});

const resize = () => {
  canvas.style.setProperty('width', `${window.innerWidth}px`);
  canvas.style.setProperty('height', `${window.innerHeight}px`);
  canvas.width = window.innerWidth * 2;
  canvas.height = window.innerHeight * 2;
  moonPath = getCelestialBodiesPaths().moonPath;
  sunPath = getCelestialBodiesPaths().sunPath;
  gl.viewport(0, 0, canvas.width, canvas.height);
};
const render = () => {
  const params = {
    width: canvas.width * 2,
    height: canvas.height * 2,
    ...UNIFORMS,
  };

  nightSky.render(params);
  requestAnimationFrame(render);
};

window.addEventListener('resize', resize);
document.addEventListener('DOMContentLoaded', resize);
resize();
render();

let hoverX = 0.1;
let hoverY = 0.1;
let randomRotation = 0;

document.addEventListener('mousemove', ({ clientX, clientY }) => {
  hoverX = clientX;
  hoverY = clientY;
});

const easeHoverPosition = () => {
  const compStyle = getComputedStyle(hoverImagesContainer);
  const currentX = compStyle.getPropertyValue('--x');
  const currentY = compStyle.getPropertyValue('--y');
  const currentRotation = compStyle.getPropertyValue('--angle');

  const newX = lerp(parseInt(currentX), hoverX, 0.3);
  const newY = lerp(parseInt(currentY), hoverY, 0.3);
  const newRotation = lerp(parseFloat(currentRotation), randomRotation, 0.3);

  hoverImagesContainer.style.setProperty('--x', `${newX}px`);
  hoverImagesContainer.style.setProperty('--y', `${newY}px`);
  hoverImagesContainer.style.setProperty('--angle', `${newRotation}deg`);

  requestAnimationFrame(() => easeHoverPosition());
};
const clearActiveHoverImages = () => {
  hoverImages.forEach((image) => image.classList.remove('hover-image--active'));
};
easeHoverPosition();

hoverImagesTargets.forEach((target) => {
  target.addEventListener('click', (e) => {
    e.preventDefault();
  });
  target.addEventListener('mouseenter', (e) => {
    clearActiveHoverImages();
    randomRotation = Math.random() * (10 - -10) + -10;
    document
      .querySelector(`#${target.dataset.target}`)
      .classList.add('hover-image--active');
  });
  target.addEventListener('mouseout', clearActiveHoverImages);
});
