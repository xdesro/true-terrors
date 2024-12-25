import PageTransition from '../transitions/PageTransition';

import { WorkExitToCaseTransition } from '../transitions/Work';
import { CaseEntryTransition } from '../transitions/Case';

export default class WorkToCaseTransition extends PageTransition {
  constructor({ wrapper }) {
    super({
      wrapper,
      exitTransition: WorkExitToCaseTransition,
      enterTransition: CaseEntryTransition,
    });
  }
}
