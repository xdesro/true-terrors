import { Core, Renderer } from "@unseenco/taxi";
import DefaultTransition from "./transitions/Default.transition";
import NavManager from "./NavManager";
import gsap from "gsap";
// import WorkTransition from "./transitions/Work.transitions";
// import WorkAltTransition from "./transitions/WorkAlt.transition";
window.navManager = new NavManager();
history.scrollRestoration = "auto";

class DefaultRenderer extends Renderer {
  onEnter() {
    navManager.updateLink();
  }

  onEnterCompleted() {
  }

  onLeave() {
  }

  onLeaveCompleted() {
  }
}

const taxi = new Core({
  allowInterruption: true,
  links: 'a[href]:not([target]):not([href^="#"]):not([data-taxi-ignore])',
  renderers: {
    default: DefaultRenderer,
  },
  transitions: {
    default: DefaultTransition,
  },
  reloadJsFilter: (element) =>
    element.dataset.taxiReload !== undefined ||
    element.src.includes("codepen.io"),
});

// taxi.addRoute('.*', '/work', 'work');
// taxi.addRoute('/work', '.*', 'work');

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
