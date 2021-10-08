import Controller from '@ember/controller';
import { action } from '@ember/object';
import { BufferedChangeset } from 'validated-changeset';

export default class ArticlesEdit extends Controller {
  @action
  async saveFunction(changeset: BufferedChangeset) {
    await changeset.save();
    console.log(changeset.data);
  }

  @action
  async saveFunctionPojo(changeset: BufferedChangeset) {
    await changeset.save();
    const underlying = changeset.data as Record<string, unknown>;
    await Promise.all(
      (underlying.comments as { id: string }[]).map((e) => {
        const comment = this.store.peekRecord('comment', e.id)!;
        comment.setProperties(e);
        return comment.save();
      })
    );
  }

  @action
  async saveComment(
    _parentChangeset: BufferedChangeset,
    changeset: BufferedChangeset
  ) {
    await changeset.save();
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'articles/edit': ArticlesEdit;
  }
}
