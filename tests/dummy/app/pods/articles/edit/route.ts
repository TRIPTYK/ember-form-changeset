import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import Store from '@ember-data/store';
import { toPojo } from 'ember-form-changeset-validations/utils/to-pojo';

export default class ArticlesEdit extends Route {
  @inject declare store: Store;

  async model({ id }: { id: string }) {
    const raw = await this.store.findRecord('article', id, {
      include: 'comments,author',
    });
    const pojo = toPojo(raw, this.store) as Record<string, unknown>;

    pojo.author = toPojo(
      this.store.peekRecord('user', pojo.author as string)!,
      this.store
    );
    pojo.comments = (pojo.comments as string[]).map((e) =>
      toPojo(this.store.peekRecord('comment', e)!, this.store)
    );

    return {
      raw,
      pojo,
    };
  }
}
