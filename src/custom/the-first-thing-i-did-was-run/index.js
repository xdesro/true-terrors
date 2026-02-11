import gsap from 'gsap';
import NightSky from './NightSky';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

import Clock from './Clock';
import axialPrecessionAtTime from './axialPrecessionAtTime';
// import dayNightTl from './dayNightCycle';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MotionPathPlugin);

const canvas = document.querySelector('.stars');
const gl = canvas.getContext('webgl');
const nightSky = new NightSky(gl);
const clock = new Clock({ el: document.querySelector('.clock') });

const moonPath = () => {
  const inset = document.querySelector('.moon').offsetWidth;
  const w = window.innerWidth - inset;
  const h = window.innerHeight - inset;
  return `M 0 ${h / 2} L 0 0 L ${w} 0 L ${w} ${h / 2}`;
};

const scenes = {
  default: {
    sky: '#030f21',
    text: '#efefef',
    clock: '#cca000',
    starColor: '#efefef',
    dateTime: 'December 31 2024, 7:30:24 PM',
  },
  light: {
    sky: '#fafafa',
    text: '#2a2722',
    clock: '#666666',
    dateTime: 'December 31 2024, 8:30:24 PM',
  },
  lateNight: {
    sky: '#030f21',
    text: '#efefef',
    clock: '#cca000',
    dateTime: 'December 31 2024, 10:00:38 PM',
  },
  midnight: {
    sky: '#010314',
    text: '#efefef',
    clock: '#DFAE1C',
    dateTime: 'December 31 2024, 11:30:11 PM',
  },
  pitchBlack: {
    sky: '#030303',
    text: '#efefef',
    clock: '#8a8a8a',
    dateTime: 'January 01 2025, 2:30 AM',
  },
  nearDawn: {
    sky: '#000919',
    text: '#efefef',
    clock: '#8a8a8a',
    dateTime: 'January 01 2025, 5:30 AM',
  },
  dawn: {
    sky: '#D4DEF2',
    text: '#030303',
    clock: '#777',
    starColor: '#D4DEF2',
    dateTime: 'January 01 2025, 7:30 AM',
  },
};
const UNIFORMS = {
  bgColor: scenes.default.sky,
  starColor: scenes.default.starColor,
  starSize: 0.05,
  starDensity: 20.0,
  twinkleBrightness: 0.6,
  twinkleSpeed: 3.0,
  panSpeed: axialPrecessionAtTime('December 31 2024, 7:30:24 PM'),
};
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  gl.viewport(0, 0, canvas.width, canvas.height);
}
window.addEventListener('resize', resize);
document.addEventListener('DOMContentLoaded', resize);
resize();

function render() {
  const params = {
    width: canvas.width,
    height: canvas.height,
    ...UNIFORMS,
  };

  nightSky.render(params);
  requestAnimationFrame(render);
}
render();

gsap
  .timeline({
    scrollTrigger: {
      trigger: '.article-content p:first-child',
      start: 'top bottom',
      end: 'top center',
      scrub: true,
      fastScrollEnd: true,
    },
  })
  .to(
    'h1',
    {
      color: '#030303',
      filter: 'blur(4px)',
      opacity: 0,
      y: '-2em',
    },
    '<',
  )
  .from(
    '.article-content',
    {
      opacity: 0,
    },
    '<',
  )
  .fromTo(
    '.clock',
    { opacity: 0 },
    {
      opacity: 1,
    },
    '<',
  );

document.querySelectorAll('[data-hide-clock]').forEach((el, i) => {
  const tl = gsap
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

const scenesTl = gsap.timeline({ paused: true });
const sceneSetters = document.querySelectorAll('[data-set-scene]');
sceneSetters.forEach((scene, i) => {
  const themeToSet = scene.dataset.setScene;
  const sceneToSet = scenes[themeToSet];
  const propsToSet = {};

  if (sceneToSet.sky) propsToSet.bgColor = sceneToSet.sky;
  if (sceneToSet.panSpeed) propsToSet.panSpeed = sceneToSet.panSpeed;
  if (sceneToSet.starColor) propsToSet.starColor = sceneToSet.starColor;
  if (sceneToSet.dateTime)
    propsToSet.panSpeed = axialPrecessionAtTime(sceneToSet.dateTime);

  const tl = gsap
    .timeline({
      scrollTrigger: {
        trigger: scene,
        start: 'top center+=200px',
        end: 'top center',
        scrub: 1,
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
    const progressFromRadians = (radians) => radians / (Math.PI * 2);
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
