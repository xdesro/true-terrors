import { Core } from "@unseenco/taxi";
import DefaultTransition from "./transitions/Default.transition";
import NavManager from "./NavManager";

const taxi = new Core({
  links: "a[href]:not([target]):not([href^=\"#\"]):not([data-taxi-ignore])",
  transitions: {
    default: DefaultTransition,
  },
  reloadJsFilter: (element) => element.dataset.taxiReload !== undefined || element.src.includes('codepen.io')
});

const navManager = new NavManager();
navManager.init();
// import SessionManager from "./utils/SessionManager.js";
// const taxi = new Core()

// import headerTl from "./animations/homepage.js";

// const sessionManager = new SessionManager();

// console.log(sessionManager.pathIsVisited())

// if (!sessionManager.pathIsVisited()) {
//     if (window.location.pathname === '/') {
//         // headerTl.play
//     }
// }
// sessionManager.mount();
