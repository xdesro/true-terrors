import PageTransition from '../transitions/PageTransition';

import {
  WritingEnterTransition,
  WritingExitTransition,
} from '../transitions/Writing';

export default class WritingToWritingTransition extends PageTransition {
  constructor({ wrapper }) {
    super({
      wrapper,
      exitTransition: WritingExitTransition,
      enterTransition: WritingEnterTransition,
    });
  }
}
