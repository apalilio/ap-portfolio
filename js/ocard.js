
const { ScrollObserver, valueAtPercentage } = aat;

const cardsContainer = document.querySelector(".overlapping-cards");
const cards = document.querySelectorAll(".ocard");
cardsContainer.style.setProperty("--cards-count", cards.length);
cardsContainer.style.setProperty("--card-height", `${cards[0].clientHeight}px`);
Array.from(cards).forEach((card, index) => {
  const offsetTop = 15 + index * 1;
  card.style.paddingTop = `${offsetTop}px`;
  if (index === cards.length - 1) {
    return;
  }
  const toScale = 1 - (cards.length - 1 - index) * 0.1;
  const nextCard = cards[index + 1];
  const cardInner = card.querySelector(".inner-ocard");
  ScrollObserver.Element(nextCard, {
    offsetTop,
    offsetBottom: window.innerHeight - card.clientHeight
  }).onScroll(({ percentageY }) => {
    cardInner.style.scale = valueAtPercentage({
      from: 1,
      to: toScale,
      percentage: percentageY
    });
    cardInner.style.filter = `brightness(${valueAtPercentage({
      from: 1,
      to: 0.6,
      percentage: percentageY
    })})`;
  });
});

// REFRESH BROWSER ON RESIZE
// window.addEventListener('resize', function(event) {
//   location.reload();
// });