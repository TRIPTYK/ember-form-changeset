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

export type ProxyWrappedChangeset<
  T extends Record<string, any> = Record<string, any>
> =
  | Changeset<T> & {
      [K in StringKeyOf<T>]: T[K];
    };
