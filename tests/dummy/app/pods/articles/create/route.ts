import Route from '@ember/routing/route';
import { Changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import ArticleValidation from '../../../validators/forms/articles';

export default class ArticlesCreate extends Route {
  model() {
    const changeset = Changeset(
      {
        comments: [],
        title: '',
        description: '',
        author: undefined,
        image: undefined,
      },
      lookupValidator(ArticleValidation),
      ArticleValidation
    );

    return {
      changeset,
    };
  }
}
