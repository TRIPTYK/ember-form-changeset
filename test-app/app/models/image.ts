import Model, { attr, belongsTo } from '@ember-data/model';
import Article from './article';

export default class Image extends Model {
  @attr('string') declare name: string;
  @attr('string') declare url: string;
  @belongsTo('article')
  declare article: Article;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    image: Image;
  }
}
