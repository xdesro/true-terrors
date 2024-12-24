const mapRange = (value, oldMin, oldMax, newMin, newMax) => {
  return ((value - oldMin) / (oldMax - oldMin)) * (newMax - newMin) + newMin;
};

export default mapRange;
