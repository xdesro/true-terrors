import PageTransition from '../transitions/PageTransition';
import { WorkEnterTransition } from '../transitions/Work';
import { HomeExitTransition } from '../transitions/Home';

export default class HomeToWorkTransition extends PageTransition {
  constructor({ wrapper }) {
    super({
      wrapper,
      exitTransition: HomeExitTransition,
      enterTransition: WorkEnterTransition,
    });
  }
}
