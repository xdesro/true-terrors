const linkifyCards = (selector) => {
  const cards = document.querySelectorAll(selector);
  cards.forEach((card) => {
    let downTime;

    const link = card.querySelector('a');
    if (link) {
      if (card.classList.contains('article-block')) {
        card.classList.add('article-block--clickable');
      } else if (card.classList.contains('case-study-block')) {
        card.classList.add('case-study-block--clickable');
      } else {
        card.classList.add('card--clickable');
      }

      card.addEventListener('mousedown', () => {
        downTime = Date.now();
      });

      card.addEventListener('mouseup', () => {
        const upTime = Date.now();
        if (upTime - downTime < 200) {
          link.click();
        }
      });
    }
  });
};
export default linkifyCards;
