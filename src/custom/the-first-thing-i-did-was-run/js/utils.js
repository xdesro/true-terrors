export const getAxialPrecessionAtTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const totalHours = hours + minutes / 60 + seconds / 3600;
  const hoursFromNoon = (totalHours - 12 + 24) % 24;
  const precessionInRadians = (hoursFromNoon / 12) * Math.PI;
  return precessionInRadians;
};

export const getCelestialBodiesPaths = () => {
  const moon = document.querySelector('.moon');
  const sun = document.querySelector('.sun');

  const { top: moontop, left: moonleft } = moon.getBoundingClientRect();
  const { top: suntop, left: sunleft } = sun.getBoundingClientRect();
  return {
    moonPath: `M0 0 C0, ${suntop - moontop} -${
      sunleft - moonleft / 2
    },711.483 -${moonleft - sunleft},${suntop - moontop}`,
    sunPath: `M0,0 C0,${moontop - suntop} 0,${moontop - suntop - 100} ${
      moonleft - sunleft
    },${moontop - suntop}`,
  };
};

export const skyRgbToNormalizedStr = (rgb) => {
  const [r, g, b, a] = rgb.map((channel) => channel / 255);
  return [r, g, b];
};

export const getProgressFromRadians = (radians) => radians / (Math.PI * 2);

export const lerp = (min, max, t) => min * (1 - t) + max * t;
