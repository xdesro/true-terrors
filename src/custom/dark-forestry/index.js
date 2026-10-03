import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import PageRasterizer from './js/PageRasterizer';
import DarkForest from './js/DarkForest';
import introTimeline from './js/animations/intro';
import { lerp } from '../the-first-thing-i-did-was-run/js/utils';

gsap.registerPlugin(ScrollTrigger);

const PIXEL_RATIO = Math.min(window.devicePixelRatio, 2);

const root = document.querySelector('main');
const intro = document.querySelector('.intro');
const canvas = document.querySelector('.forest');
const gl = canvas.getContext('webgl');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

let lastScrollY = window.scrollY;
let velocity = 0;

const init = () => {
  const rasterizer = new PageRasterizer({ root, pixelRatio: PIXEL_RATIO });
  const darkForest = new DarkForest(gl);

  const resize = () => {
    const { clientWidth, clientHeight } = canvas;
    if (
      clientWidth === rasterizer.width &&
      clientHeight === rasterizer.height
    ) {
      return;
    }
    canvas.width = clientWidth * PIXEL_RATIO;
    canvas.height = clientHeight * PIXEL_RATIO;
    rasterizer.resize(clientWidth, clientHeight);
    gl.viewport(0, 0, canvas.width, canvas.height);
  };
  const render = () => {
    const { scrollY } = window;
    const maxScrollY =
      document.documentElement.scrollHeight - window.innerHeight;
    const hitEdge =
      (velocity < 0 && scrollY <= 0) || (velocity > 0 && scrollY >= maxScrollY);

    const scrollSpeed = reducedMotion.matches
      ? 0
      : (scrollY - lastScrollY) / canvas.clientHeight;

    velocity = lerp(velocity, scrollSpeed, hitEdge ? 0.3 : 0.08);

    if (rasterizer.isDirty || scrollY !== lastScrollY) {
      rasterizer.draw();
      darkForest.updatePage(rasterizer.canvas);
    }
    lastScrollY = scrollY;

    const hero = rasterizer.hero();
    if (hero) darkForest.updateHero(hero.image);

    darkForest.render({
      width: canvas.width,
      height: canvas.height,
      velocity,
      heroRect: hero?.rect ?? [0, 0, 1, 1],
    });
  };

  document.documentElement.classList.add('is-shaded');
  resize();
  rasterizer.measure();

  window.addEventListener('resize', resize);
  new ResizeObserver(() => rasterizer.measure()).observe(root);
  document.addEventListener('selectionchange', () =>
    rasterizer.measureSelection(),
  );
  ['pointerover', 'pointerout', 'focusin', 'focusout'].forEach((type) =>
    root.addEventListener(type, () => rasterizer.restyle()),
  );

  gsap.ticker.add(render);
  return rasterizer;
};

document.fonts.ready.then(() => {
  const rasterizer = gl && !reducedMotion.matches ? init() : null;

  introTimeline({
    prefersReducedMotion: reducedMotion.matches,
    onUpdate: () => rasterizer?.measure(intro),
  });
  if (!reducedMotion.matches) {
    gsap.fromTo(
      '.intro picture',
      {
        yPercent: 0,
        scale: 1.2,
        transformOrigin: 'center bottom',
      },
      {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: intro,
          scrub: 0.5,
          start: 'top top',
          end: 'bottom top',
        },
      },
    );
  }
});
