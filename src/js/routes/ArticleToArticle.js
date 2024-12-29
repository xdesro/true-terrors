import PageTransition from '../transitions/PageTransition';

import {
  ArticleEnterTransition,
  ArticleExitTransition,
} from '../transitions/Article';

export default class ArticleToArticleTransition extends PageTransition {
  constructor({ wrapper }) {
    super({
      wrapper,
      exitTransition: ArticleExitTransition,
      enterTransition: ArticleEnterTransition,
    });
  }
}
