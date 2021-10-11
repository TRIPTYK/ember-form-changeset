import Controller from '@ember/controller';
import { action } from '@ember/object';
import { BufferedChangeset } from 'ember-changeset/types';

export default class ArticlesCreate extends Controller {
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
  // normal class body definition here
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'articles/create': ArticlesCreate;
  }
}
