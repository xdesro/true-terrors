import PageTransition from '../transitions/PageTransition';

import { CaseExitTransition } from '../transitions/Case';
import { HomeEntranceTransition } from '../transitions/Home';

export default class CaseToHomeTransition extends PageTransition {
  constructor({ wrapper }) {
    super({
      wrapper,
      exitTransition: CaseExitTransition,
      enterTransition: HomeEntranceTransition,
    });
  }
}
