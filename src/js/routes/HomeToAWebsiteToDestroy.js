import PageTransition from '../transitions/PageTransition';

import { ToAWebsiteToDestroy } from '../transitions/AWebsiteToDestroy';

export default class HomeToAWebsiteToDestroyTransition extends PageTransition {
  constructor({ wrapper }) {
    super({
      wrapper,
      exitTransition: ToAWebsiteToDestroy,
      enterTransition: false,
    });
  }
}
