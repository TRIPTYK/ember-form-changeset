import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject } from '@ember/service';
import { BufferedChangeset } from 'ember-changeset/types';
import Store from '@ember-data/store';
import { ArticlesDTO } from '../../components/forms/articles/component';
import RouterService from '@ember/routing/router-service';

export default class ArticlesCreate extends Controller {
  @inject declare store: Store;
  @inject declare router: RouterService;

  @action
  async saveFunction(changeset: BufferedChangeset) {
    const underlying = changeset.pendingData as Partial<ArticlesDTO>;

    const image = await this.store
      .createRecord('image', {
        name: changeset.get('name'),
        path: changeset.get('url'),
      })
      .save();

    const articleRecord = await this.store
      .createRecord('article', {
        title: underlying.title,
        description: underlying.description,
        image,
      })
      .save();

    await Promise.all(
      underlying.comments!.map((e) =>
        this.store
          .createRecord('comment', { ...e, article: articleRecord })
          .save()
      )
    );

    this.router.transitionTo('articles');
  }

  @action
  async editComment(changeset: BufferedChangeset) {
    changeset.execute();
  }

  @action
  async createComment(
    parentChangeset: BufferedChangeset,
    changeset: BufferedChangeset
  ) {
    parentChangeset.set('comments', [
      ...parentChangeset.get('comments'),
      // TODO: add changeset type
      { ...(changeset as any).pendingData },
    ]);

    changeset.rollback();
  }
  // normal class body definition here
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'articles/create': ArticlesCreate;
  }
}
