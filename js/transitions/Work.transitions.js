// import { Transition } from "@unseenco/taxi";
import gsap from "gsap";

export const WorkEnterTransition = (transitioningView) => {
  const title = transitioningView.querySelector(".page-header__title");
  Splitting({ target: title, by: "chars" });

  const enterTl = gsap.timeline();
  enterTl
    .set(title.querySelectorAll(".char"), {
      display: "inline-block",
    })
    .from(
      title.querySelectorAll(".char"),
      {
        y: "100%",
        clipPath: "polygon(0% 0%, 140% 0%, 140% 0%, 0% 0%)",
        stagger: {
          each: 0.02,
        },
        opacity: 0,
        duration: 1,
        ease: "power4.inOut",
        // onComplete: done
      },
      "<"
    )
    .from(
      ".page-header__bar",
      {
        //   scaleX: 0,
        // x: "-10%",
        opacity: 0,
        duration: 0.3,
      },
      ">-=.5"
    )
    .from(
      ".case-study-block",
      {
        opacity: 0,
        x: -10,
        stagger: 0.1,
      },
      ">"
    )
    .from(
      ".list-design-element",
      {
        opacity: 0,
        stagger: 0.1,
      },
      "<"
    );
};

export const WorkExitTransition = (transitioningView) => {
  const title = transitioningView.querySelector(".page-header__title");
  if (title && !title.classList.contains('splitting')) {
    Splitting({ target: title, by: "chars" });
  }
  const exitTl = gsap.timeline();
  exitTl
    .set(".page-header__title .char", {
      display: "inline-block",
    })
    .to(
      ".page-header__title .char",
      {
        y: "-100%",
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        stagger: {
          each: 0.02,
        },
        opacity: 0,
        duration: 1,
        ease: "power4.inOut",
        // onComplete: done
      },
      "<"
    )
    .to(
      ".cases-block-list",
      {
        opacity: 0,
      },
      "<"
    )
    .to(
      ".page-header__bar",
      {
        //   scaleX: 0,
        height: 0,
        yPercent: 0,
        y: "-3rem",
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in'
      },
      ">-=.3"
    )
    

    return exitTl
};
