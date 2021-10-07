import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import Comment from './comment';
import User from './user';

export default class Article extends Model {
  @attr() declare title: string;
  @hasMany('comment') declare comments: Comment[];
  @belongsTo('user') declare author: User;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    article: Article;
  }
}
