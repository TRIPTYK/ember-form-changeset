import Route from '@ember/routing/route';
import { Changeset } from 'ember-changeset';

export default class ArticlesCreate extends Route {
  model() {
    const changeset = Changeset({
      comments: [],
      title: '',
      description: '',
      author: undefined,
      image: undefined,
    });

    return {
      changeset,
    };
  }
}
