import { BufferedChangeset } from 'ember-changeset/types';

export interface TypedBufferedChangeset<T extends Record<string, any>>
  extends BufferedChangeset {
  pendingData: Partial<T>;
  data: T;
  get(key: string): unknown;
  set(key: string, value: unknown): void;
}
