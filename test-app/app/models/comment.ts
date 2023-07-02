import Model, { attr, belongsTo } from '@ember-data/model';
import Article from './article';
import User from './user';

export default class Comment extends Model {
  @attr() declare content: string;
  @belongsTo('article') declare article: Article;
  @belongsTo('user') declare author: User;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    comment: Comment;
  }
}
