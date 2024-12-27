import PageTransition from '../transitions/PageTransition';

import { DefaultFadeOut } from '../transitions/Fade';
import { ArticleEnterTransition } from '../transitions/Article';

export default class HomeToArticleTransition extends PageTransition {
  constructor({ wrapper }) {
    super({
      wrapper,
      exitTransition: DefaultFadeOut,
      enterTransition: ArticleEnterTransition,
    });
  }
}
