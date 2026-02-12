import gsap from 'gsap';
import NightSky from './NightSky';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { MotionPathHelper } from 'gsap/MotionPathHelper';
import Clock from './Clock';
import axialPrecessionAtTime from './axialPrecessionAtTime';
// import dayNightTl from './dayNightCycle';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(MotionPathHelper);

const getCelestialBodiesPaths = () => {
  const moon = document.querySelector('.moon');
  const sun = document.querySelector('.sun');

  const { top: moontop, left: moonleft } = moon.getBoundingClientRect();
  const { top: suntop, left: sunleft } = sun.getBoundingClientRect();
  console.log(moonleft - sunleft);
  console.log(suntop - moontop);
  // return `M 0 0 A 2 1 90 1 1 -${window.innerWidth - 64 - 96} ${suntop - top}`;
  return {
    moonPath: `M0 0 C0, ${suntop - moontop} -${
      sunleft - moonleft / 2
    },711.483 -${moonleft - sunleft},${suntop - moontop}`,
    sunPath: `M0,0 C0,${moontop - suntop} 0,${moontop - suntop - 100} ${
      moonleft - sunleft
    },${moontop - suntop}`,
  };
};

let { moonPath, sunPath } = getCelestialBodiesPaths();

const canvas = document.querySelector('.stars');
const gl = canvas.getContext('webgl');
const nightSky = new NightSky(gl);
const clock = new Clock({ el: document.querySelector('.clock') });

const scenes = {
  default: {
    sky: '#030f21',
    text: '#efefef',
    clock: '#cca000',
    starColor: '#efefef',
    dateTime: 'December 31 2024, 7:30:24 PM',
  },
  light: {
    sky: '#fefefe',
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
    text: '#a5aab6',
    clock: '#DFAE1C',
    dateTime: 'December 31 2024, 11:30:11 PM',
  },
  pitchBlack: {
    sky: '#030303',
    text: '#a5aab6',
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
  final: {
    sky: '#fefefe',
    text: '#030303',
    clock: '#777',
    starColor: '#fefefe',
    dateTime: 'January 01 2025, 10:30 AM',
  },
};
const UNIFORMS = {
  bgColor: scenes.default.sky,
  starColor: scenes.default.starColor,
  starSize: 0.05,
  starDensity: 20.0,
  twinkleBrightness: 0.8,
  twinkleSpeed: 3.0,
  panSpeed: axialPrecessionAtTime('December 31 2024, 7:30:24 PM'),
};
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  moonPath = getCelestialBodiesPaths().moonPath;
  sunPath = getCelestialBodiesPaths().sunPath;
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
      end: 'center center',
      scrub: 1,
      fastScrollEnd: true,
    },
  })

  .to(
    '.hero',
    {
      color: '#030303',
      filter: 'blur(4px)',
      opacity: 0,
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
  )
  .to(
    '.moon',
    {
      motionPath: {
        path: moonPath,
        alignOrigin: [0.5, 0.5],
      },
      ease: 'Power4.inOut',
    },
    '<',
  )
  .to(
    '.sun',
    {
      motionPath: {
        path: sunPath,
        alignOrigin: [0.5, 0.5],
      },
      ease: 'Power4.inOut',
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
