import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import Comment from './comment';
import User from './user';
import Image from './image';

export default class Article extends Model {
  @attr() declare title: string;
  @attr() declare description: string;
  @hasMany('comment') declare comments: Comment[];
  @belongsTo('user') declare author: User;
  @belongsTo('image') declare image: Image;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    article: Article;
  }
}
