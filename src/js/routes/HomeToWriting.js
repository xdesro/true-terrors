import PageTransition from '../transitions/PageTransition';

import { WritingEnterTransition } from '../transitions/Writing';
import { HomeExitTransition } from '../transitions/Home';

export default class HomeToWritingTransition extends PageTransition {
  constructor({ wrapper }) {
    super({
      wrapper,
      exitTransition: HomeExitTransition,
      enterTransition: WritingEnterTransition,
    });
  }
}
