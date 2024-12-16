import gsap from "gsap";
import { convertSplitElIntoLines } from "../utils/convertSplitElIntoLines";

export const ArticleEnterTransition = (transitioningView) => {
  const title = transitioningView.querySelector(".article-header__title");
  Splitting({ target: title, by: "lines" });
  title.innerHTML = convertSplitElIntoLines(title);

  const enterTl = gsap.timeline({
    // ease: 'power3.easeIn'
  });

  enterTl
    .from(title.querySelectorAll(".line"), {
      y: "-50%",
      opacity: 0,
      stagger: 0.05,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    //   clipPath: "polygon(0% 140%, 100% 140%, 100% 140%, 0% 140%)",
      duration: 0.5,
      // color: "red",
    })

    .from(
      ".article-header__meta div :is(dt, dd:not(:has(ul)), li)",
      {
        opacity: 0,
        duration: 0.5,
        y: "-50%",
        stagger: {
          each: 0.02,
          from: "end",
        },
      },
      "<+=.2"
    )
    .from(
      ".article-header__category",
      {
        opacity: 0,
        duration: 0.5,
      },
      "<"
    )
    .from(
      ".table-of-contents :is(h2, li)",
      {
        opacity: 0,
        duration: 0.5,
        y: "-25%",
        stagger: {
          each: 0.02,
        },
      },
      "<+=.2"
    )
    .from(
      ".article-header__image",
      {
        opacity: 0,
        duration: 0.3,
      },
      "<"
    )
    .from(
      ".article-content",
      {
        opacity: 0,
        duration: 0.3,
      },
      "<+=.2"
    );
  //   enterTl.to(title)

  return enterTl;
};

export const WorkExitTransition = (transitioningView) => {
  const title = transitioningView.querySelector(".page-header__title");
  if (title && !title.classList.contains("splitting")) {
    Splitting({ target: title, by: "chars" });
  }

  const exitTl = gsap.timeline();

  return exitTl;
};
