import Controller from '@ember/controller';
import { action } from '@ember/object';
import { BufferedChangeset } from 'validated-changeset';

export default class ArticlesEdit extends Controller {
  @action
  async saveFunction(changeset: BufferedChangeset) {
    const underlying = {
      ...(changeset.pendingData as Record<string, unknown>),
    };

    const comments = await Promise.all(
      (underlying.comments as any[]).map((e) =>
        (e.id
          ? this.store.peekRecord('comment', e.id)!
          : this.store.createRecord('comment', e)
        ).save()
      )
    );

    delete underlying.comments;

    const record = this.store.peekRecord('article', changeset.get('id'))!;

    record.setProperties({
      ...underlying,
      comments,
    });

    await record.save();
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
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'articles/edit': ArticlesEdit;
  }
}
