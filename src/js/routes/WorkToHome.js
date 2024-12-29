import PageTransition from '../transitions/PageTransition';

import { WorkExitTransition } from '../transitions/Work';
import { HomeEntranceTransition } from '../transitions/Home';

export default class WorkToHomeTransition extends PageTransition {
  constructor({ wrapper }) {
    super({
      wrapper,
      exitTransition: WorkExitTransition,
      enterTransition: HomeEntranceTransition,
    });
  }
}
