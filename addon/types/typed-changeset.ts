import { BufferedChangeset } from 'ember-changeset/types';

export interface TypedBufferedChangeset<T extends Record<string, any>>
  extends BufferedChangeset {
  pendingData: Partial<T>;
  data: T;
  // eslint-disable-next-line no-unused-vars
  get<K extends keyof T>(key: K): T[K];
  // eslint-disable-next-line no-unused-vars
  set<K extends keyof T>(key: K, value: any): void;
}
