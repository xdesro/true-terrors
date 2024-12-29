import PageTransition from '../transitions/PageTransition';

import { WritingExitTransition } from '../transitions/Writing';
import { HomeEntranceTransition } from '../transitions/Home';

export default class WritingToHomeTransition extends PageTransition {
  constructor({ wrapper }) {
    super({
      wrapper,
      exitTransition: WritingExitTransition,
      enterTransition: HomeEntranceTransition,
    });
  }
}
