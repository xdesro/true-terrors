import PageTransition from '../transitions/PageTransition';

import { WritingExitTransition } from '../transitions/Writing';
import { ArticleEnterTransition } from '../transitions/Article';

export default class WritingToArticleTransition extends PageTransition {
  constructor({ wrapper }) {
    super({
      wrapper,
      exitTransition: WritingExitTransition,
      enterTransition: ArticleEnterTransition,
    });
  }
}
