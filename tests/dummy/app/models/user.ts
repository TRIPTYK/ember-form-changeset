import Model, { attr, hasMany } from '@ember-data/model';
import Article from './article';

export default class User extends Model {
  @hasMany('article') declare articles: Article[];
  @attr('string') declare username: string;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    user: User;
  }
}
