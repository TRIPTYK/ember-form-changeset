import { BufferedChangeset } from 'ember-changeset/types';

export interface TypedBufferedChangeset<T extends Record<string, any>>
  extends BufferedChangeset {
  // eslint-disable-next-line no-unused-vars
  get(key: keyof T): any;
  // eslint-disable-next-line no-unused-vars
  set(key: keyof T, value: any): void;
}
