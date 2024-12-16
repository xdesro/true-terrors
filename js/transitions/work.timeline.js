import gsap from "gsap";

const workEntryTimeline = (transitoryElement, done) => {
  const tl = gsap.timeline({
    onComplete: done
  });
  const title = transitoryElement.querySelector(".page-header__title");
  if (!title.classList.contains('splitting')) {
    Splitting({ target: title, by: "chars" });
  }
  tl
    return tl;
};
// Splitting({ target: title.querySelectorAll(".word"), by: "chars" });
export default workEntryTimeline