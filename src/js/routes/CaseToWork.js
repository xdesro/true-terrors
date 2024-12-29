import PageTransition from '../transitions/PageTransition';

import { WorkEnterTransition } from '../transitions/Work';
import { CaseExitTransition } from '../transitions/Case';

export default class WorkToCaseTransition extends PageTransition {
  constructor({ wrapper }) {
    super({
      wrapper,
      exitTransition: CaseExitTransition,
      enterTransition: WorkEnterTransition,
    });
  }
}
