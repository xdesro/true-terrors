import recognition from './recognition.js';
const publishers = {};

recognition.forEach((item) => {
  const { publisher, award } = item;
  if (publishers.hasOwnProperty(publisher)) {
    if (publishers[publisher].hasOwnProperty(award)) {
      publishers[publisher][award].push(item);
    } else {
      publishers[publisher][award] = [item];
    }
  } else {
    publishers[publisher] = {};
    if (publishers[publisher].hasOwnProperty(award)) {
      publishers[publisher][award].push(item);
    } else {
      publishers[publisher][award] = [item];
    }
  }
});

export default publishers;
