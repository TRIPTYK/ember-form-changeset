import Controller from '@ember/controller';
import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import { inject } from '@ember/service';
import { TypedBufferedChangeset } from 'ember-form-changeset-validations';
import { BufferedChangeset } from 'validated-changeset';
import {
  ArticlesDTO,
  CommentsDTO,
} from '../../components/forms/articles/component';

export default class ArticlesEdit extends Controller {
  @inject declare router: RouterService;

  @action
  async saveFunction(changeset: TypedBufferedChangeset<ArticlesDTO>) {
    // don't forget to copy
    const data = { ...changeset.pendingData };
    const articleRecord = this.store.peekRecord(
      'article',
      changeset.get('id')!
    )!;

    const image = this.store.peekRecord('image', data.image?.id!);
    image?.set('url', data.image?.url);
    image?.set('name', data.image?.name);
    await image?.save();

    /**
     * Saving comments
     */
    await Promise.all(
      data.comments!.map((e) => {
        const record = e.id
          ? this.store.peekRecord('comment', e.id)!
          : this.store.createRecord('comment');
        record.setProperties({ article: articleRecord, content: e.content });
        return record.save();
      })
    );

    await articleRecord.save();

    // atfer save, go to article
    this.router.transitionTo('articles');
  }

  @action
  async createComment(
    parentChangeset: TypedBufferedChangeset<ArticlesDTO>,
    changeset: TypedBufferedChangeset<CommentsDTO>
  ) {
    // add the comment object to the comments, SHALLOW COPY PLEASE
    parentChangeset.set('comments', [
      ...parentChangeset.get('comments'),
      { ...changeset.pendingData },
    ]);
  }

  @action
  async editComment(
    _parentChangeset: BufferedChangeset,
    changeset: BufferedChangeset
  ) {
    // execute saves to the underlying content => THE ACTUAL COMMENT, so nothing to do (no rollback possible)
    changeset.execute();
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'articles/edit': ArticlesEdit;
  }
}
