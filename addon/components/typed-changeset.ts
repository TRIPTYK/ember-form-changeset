import { BufferedChangeset } from 'ember-changeset/types';

export interface TypedBufferedChangeset<
  T extends Record<string, any> = Record<string, any>
> extends BufferedChangeset {
  pendingData: Partial<T>;
  data: T;
  /**
   * In case it's an unknown key, just specify the expected return type
   */
  get<Key extends keyof T>(key: Key): T[Key];
  get<K>(key: string): K;
  set(key: keyof T, value: unknown): void;
}
