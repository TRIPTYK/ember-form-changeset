import Controller from '@ember/controller';
import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import { inject } from '@ember/service';
import { BufferedChangeset } from 'validated-changeset';
import { ArticlesDTO } from '../../components/forms/articles/component';

export default class ArticlesEdit extends Controller {
  @inject declare router: RouterService;

  @action
  async saveFunction(changeset: BufferedChangeset) {
    const data = changeset.pendingData as ArticlesDTO;
    const articleRecord = this.store.peekRecord(
      'article',
      changeset.get('id')
    )!;

    /**
     * Saving comments
     */
    await Promise.all(
      data.comments.map((e) => {
        const record = e.id
          ? this.store.peekRecord('comment', e.id)!
          : this.store.createRecord('comment');
        record.setProperties({ ...e, article: articleRecord } as any);
        return record.save();
      })
    );

    await articleRecord.save();

    this.router.transitionTo('articles');
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
