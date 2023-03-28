import { IterableElement } from 'type-fest';
import { Changeset } from './typed-changeset';

export type NestedChangesetData<DTO> = {
  [TKey in keyof DTO]: DTO[TKey] extends infer T
    ? T extends Changeset[]
      ? NestedChangesetData<IterableElement<T>['data']>[]
      : T extends Changeset
      ? T['data']
      : T
    : never;
};
