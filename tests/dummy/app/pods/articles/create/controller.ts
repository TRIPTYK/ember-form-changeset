import Controller from '@ember/controller';
import { action } from '@ember/object';
import { BufferedChangeset } from 'ember-changeset/types';

export default class ArticlesCreate extends Controller {
  @action
  async saveFunction(changeset: BufferedChangeset) {
    const underlying = changeset.data as Record<string, unknown>;
    console.log(underlying);
    await changeset.save();
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
