import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import Store from '@ember-data/store';
import { toPojo } from 'ember-form-changeset-validations/utils/to-pojo';
import { Changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import ArticleValidation from '../../../validators/forms/articles';

export default class ArticlesEdit extends Route {
  @inject declare store: Store;

  async model({ id }: { id: string }) {
    const article = await this.store.findRecord('article', id, {
      include: 'comments,author,image',
    });
    const pojo = toPojo(article, this.store) as Record<string, unknown>;

    // pojoize image relationship
    pojo.image = toPojo(article.image, this.store);

    // pojoize comments relationship
    pojo.comments = article.comments.map((e) => toPojo(e, this.store));

    const changeset = Changeset(
      pojo,
      lookupValidator(ArticleValidation),
      ArticleValidation
    );

    return {
      article,
      changeset,
    };
  }
}
