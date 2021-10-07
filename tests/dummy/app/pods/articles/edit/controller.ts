import Controller from '@ember/controller';
import { action } from '@ember/object';
import { BufferedChangeset } from 'validated-changeset';

export default class ArticlesEdit extends Controller {
  @action
  async saveFunction(changeset: BufferedChangeset) {
    await changeset.save();
  }

  @action
  async saveComment(
    _parentChangeset: BufferedChangeset,
    changeset: BufferedChangeset
  ) {
    changeset.execute();
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'articles/edit': ArticlesEdit;
  }
}
