export const convertSplitElIntoLines = (el) => {
  const words = el.querySelectorAll('.word');
  if (words) {
    const lines = [];
    words.forEach((word) => {
      const lineIndex = getComputedStyle(word).getPropertyValue('--line-index');
      if (lines[lineIndex]) {
        lines[lineIndex].push(word);
      } else {
        lines[lineIndex] = [];
        lines[lineIndex].push(word);
      }
    });
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
  } else {
    return el.innerHTML;
  }
};
