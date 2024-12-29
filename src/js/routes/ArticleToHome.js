import PageTransition from '../transitions/PageTransition';

import { HomeEntranceTransition } from '../transitions/Home';
import { ArticleExitTransition } from '../transitions/Article';

export default class ArticleToHomeTransition extends PageTransition {
  constructor({ wrapper }) {
    super({
      wrapper,
      exitTransition: ArticleExitTransition,
      enterTransition: HomeEntranceTransition,
    });
  }
}
