import { EmberChangeset } from 'ember-changeset';
import { StringKeyOf } from 'type-fest';

export interface Changeset<T extends Record<string, any> = Record<string, any>>
  extends EmberChangeset {
  data: T;
  /**
   * In case it's an unknown key, just specify the expected return type
   */
  get<K extends StringKeyOf<T>>(key: K): T[K];
  set<K extends StringKeyOf<T>>(key: K, value: T[K]): void;
  validate(...validationKeys: StringKeyOf<T>[]): Promise<unknown>;
}

/**
 * A changeset wrapped into a proxy
 * https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Proxy
 */
export type ProxyWrappedChangeset<T extends Changeset> =
  | T & {
      [K in StringKeyOf<T['data']>]: T['data'][K];
    };
