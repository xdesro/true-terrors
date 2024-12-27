import PageTransition from '../transitions/PageTransition';

import { DefaultFadeOut } from '../transitions/Fade';
import { CaseEntryTransition } from '../transitions/Case';

export default class HomeToArticleTransition extends PageTransition {
  constructor({ wrapper }) {
    super({
      wrapper,
      exitTransition: DefaultFadeOut,
      enterTransition: CaseEntryTransition,
    });
  }
}
