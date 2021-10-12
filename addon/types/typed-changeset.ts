import { BufferedChangeset } from 'ember-changeset/types';

export interface TypedBufferedChangeset<
  T extends Record<string, any> = Record<string, unknown>
> extends BufferedChangeset {
  pendingData: Partial<T>;
  data: T;
  get<Key extends keyof T>(key: Key): T[Key];
  set(key: keyof T, value: unknown): void;
}
