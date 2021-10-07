import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class Application extends JSONAPIAdapter {
  namespace = 'api';
}

// DO NOT DELETE: this is how TypeScript knows how to look up your adapters.
declare module 'ember-data/types/registries/adapter' {
  export default interface AdapterRegistry {
    application: Application;
  }
}
