import Route from '@ember/routing/route';

export default class ArticlesIndex extends Route {
  model() {
    return this.store.findAll('article', {
      include: 'comments,author',
    });
  }
}
