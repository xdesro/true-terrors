// import { Transition } from "@unseenco/taxi";
import gsap from 'gsap';
import { convertSplitElIntoLines } from '../utils/convertSplitElIntoLines';

export const WritingEnterTransition = (transitioningView) => {
  const title = transitioningView.querySelector('.page-header__title');
  const description = transitioningView.querySelector(
    '.page-header__description'
  );
  Splitting({ target: title, by: 'chars' });
  if (description) {
    Splitting({ target: description, by: 'lines' });
    description.innerHTML = convertSplitElIntoLines(description);
  }

  const enterTl = gsap.timeline();
  enterTl
    .set(title.querySelectorAll('.char'), {
      display: 'inline-block',
    })
    .from(
      title.querySelectorAll('.char'),
      {
        y: '100%',
        clipPath: 'polygon(0% 0%, 140% 0%, 140% 0%, 0% 0%)',
        stagger: {
          each: 0.02,
        },
        opacity: 0,
        duration: 1,
        ease: 'power4.inOut',
        // onComplete: done
      },
      '<'
    )
    .from(
      '.page-header__description .line, .table-of-contents :is(h2, li)',
      {
        y: '50%',
        opacity: 0,
        stagger: 0.05,
        clipPath: 'polygon(0% 0%, 140% 0%, 140% 0%, 0% 0%)',
        //   clipPath: "polygon(0% 140%, 100% 140%, 100% 140%, 0% 140%)",
        duration: 0.5,
        // color: "red",
      },
      '>-=.5'
    )
    .from(
      '.writing-section',
      {
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power4.inOut',
      },
      '<'
    );
};

export const WritingExitTransition = (transitioningView) => {
  const title = transitioningView.querySelector('.page-header__title');
  if (title && !title.classList.contains('splitting')) {
    Splitting({ target: title, by: 'chars' });
  }
  const exitTl = gsap.timeline();
  exitTl
    .set(title.querySelectorAll('.char'), {
      display: 'inline-block',
    })
    .to(
      title?.querySelectorAll('.char'),
      {
        y: '-100%',
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
        stagger: {
          each: 0.02,
        },
        opacity: 0,
        duration: 1,
        ease: 'power4.inOut',
        // onComplete: done
      },
      '<'
    )
    .to(
      '.page-header__description, .table-of-contents__title, .table-of-contents__list li',
      {
        y: '-50%',
        opacity: 0,
        ease: 'power3.in',
        stagger: 0.1,
        duration: 0.3,
      },
      '<+=.2'
    )
    .to(
      '.page-header, .writing-section',
      {
        opacity: 0,
        y: '-1rem',
        duration: 0.4,
        stagger: 0.03,
        ease: 'power3.in',
      },
      '<'
    );

  return exitTl;
};
