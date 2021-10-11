import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject } from '@ember/service';
import { BufferedChangeset } from 'ember-changeset/types';
import Store from '@ember-data/store';

export default class ArticlesCreate extends Controller {
  @inject declare store: Store;

  @action
  async saveFunction(changeset: BufferedChangeset) {
    const underlying = {
      ...(changeset.pendingData as Record<string, unknown>),
    };

    const comments = await Promise.all(
      (underlying.comments as any[]).map((e) =>
        this.store.createRecord('comment', e).save()
      )
    );

    delete underlying.comments;

    await this.store
      .createRecord('article', {
        ...underlying,
        comments,
      })
      .save();
  }

  @action
  async saveComment(
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
