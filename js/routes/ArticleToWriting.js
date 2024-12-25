import PageTransition from '../transitions/PageTransition';

import { WritingEnterTransition } from '../transitions/Writing';
import { ArticleExitTransition } from '../transitions/Article';

export default class ArticleToWritingTransition extends PageTransition {
  constructor({ wrapper }) {
    super({
      wrapper,
      exitTransition: ArticleExitTransition,
      enterTransition: WritingEnterTransition,
    });
  }
}
