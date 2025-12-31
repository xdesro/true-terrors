import PageTransition from '../transitions/PageTransition';

import { ToAWebsiteToDestroy } from '../transitions/Fade';

export default class HomeToAWebsiteToDestroyTransition extends PageTransition {
  constructor({ wrapper }) {
    super({
      wrapper,
      exitTransition: ToAWebsiteToDestroy,
      enterTransition: false,
    });
  }
}
