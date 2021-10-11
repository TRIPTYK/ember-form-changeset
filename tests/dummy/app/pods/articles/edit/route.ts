import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import Store from '@ember-data/store';
import { toPojo } from 'ember-form-changeset-validations/utils/to-pojo';
import { Changeset } from 'ember-changeset';

export default class ArticlesEdit extends Route {
  @inject declare store: Store;

  async model({ id }: { id: string }) {
    const article = await this.store.findRecord('article', id, {
      include: 'comments,author',
    });
    const pojo = toPojo(article, this.store) as Record<string, unknown>;

    pojo.comments = (pojo.comments as string[]).map((e) =>
      toPojo(this.store.peekRecord('comment', e)!, this.store)
    );

    const changeset = Changeset(pojo);

    console.log(pojo);

    return {
      article,
      changeset,
    };
  }
}
