import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import Store from '@ember-data/store';

export default class ArticlesEdit extends Route {
  @inject declare store: Store;

  model({ id }: { id: string }) {
    return this.store.findRecord('article', id, {
      include: 'comments,author',
    });
  }
}
