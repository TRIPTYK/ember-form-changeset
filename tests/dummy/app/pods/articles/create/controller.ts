import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject } from '@ember/service';
import { BufferedChangeset } from 'ember-changeset/types';
import Store from '@ember-data/store';
import { ArticlesDTO } from '../../components/forms/articles/component';
import RouterService from '@ember/routing/router-service';
import { TypedBufferedChangeset } from 'ember-form-changeset-validations';

export default class ArticlesCreate extends Controller {
  @inject declare store: Store;
  @inject declare router: RouterService;

  @action
  async saveFunction(changeset: TypedBufferedChangeset<ArticlesDTO>) {
    const image = await this.store
      .createRecord('image', {
        name: changeset.get<string>('image.name'),
        path: changeset.get<string>('image.url'),
      })
      .save();

    const articleRecord = await this.store
      .createRecord('article', {
        title: changeset.get('title'),
        description: changeset.get('description'),
        image,
      })
      .save();

    await Promise.all(
      changeset
        .get('comments')
        .map((e) =>
          this.store
            .createRecord('comment', { ...e, article: articleRecord })
            .save()
        )
    );

    this.router.transitionTo('articles');
  }

  @action
  async editComment(changeset: BufferedChangeset) {
    // persists the changes into the underlying object
    changeset.execute();
  }

  @action
  async createComment(
    parentChangeset: TypedBufferedChangeset<ArticlesDTO>,
    changeset: TypedBufferedChangeset<ArticlesDTO>
  ) {
    // append to comments array
    parentChangeset.set('comments', [
      ...parentChangeset.get('comments'),
      { ...changeset.pendingData },
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
