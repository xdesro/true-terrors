import gsap from "gsap";
// import { convertSplitElIntoLines } from "../utils/convertSplitElIntoLines";

export const CaseExitTransition = (transitioningView) => {
  //   const title = transitioningView.querySelector(".article-header__title");
  //   Splitting({ target: title, by: "lines" });
  //   title.innerHTML = convertSplitElIntoLines(title);
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  const exitTl = gsap.timeline({
    // ease: 'power3.easeIn'
    clearProps: true,
    onStart() {
      console.log("playing");
    },
  });
  exitTl.to(
    ".case-header__logo, .case-header__title, .case-header__abstract, .case-header__meta, .table-of-contents, .article-content",
    {
      opacity: 0,
      y: "50%",
      ease: "power4.in",
      stagger: 0.05,
      duration: 0.3,
    }
  );
  return exitTl;
};

// export const WorkExitTransition = (transitioningView) => {
//   const title = transitioningView.querySelector(".page-header__title");
//   if (title && !title.classList.contains("splitting")) {
//     Splitting({ target: title, by: "chars" });
//   }

//   const exitTl = gsap.timeline();

//   return exitTl;
// };
