export const convertSplitElIntoLines = (el) => {
  const words = el.querySelectorAll('.word');
  const lines = [];
  words.forEach((word) => {
    // console.log(getComputedStyle(word))
    const lineIndex = getComputedStyle(word).getPropertyValue('--line-index');
    if (lines[lineIndex]) {
      lines[lineIndex].push(word);
    } else {
      lines[lineIndex] = [];
      lines[lineIndex].push(word);
    }
  });
  console.log(lines);
  const template = `${lines
    .map((line) => {
      return `<div class="line">${line
        .map((word) => {
          return word.outerHTML;
        })
        .join(' ')}</div>`;
    })
    .join(' ')}`;

  return template;
};
