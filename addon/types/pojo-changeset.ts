import { TypedBufferedChangeset } from './typed-changeset';

type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
  infer ElementType
>
  ? ElementType
  : never;

export type ChangesetData<DTO> = {
  [TKey in keyof DTO]: DTO[TKey] extends infer T
    ? T extends TypedBufferedChangeset[]
      ? ChangesetData<ElementType<T>['data']>[]
      : T extends TypedBufferedChangeset
      ? T['data']
      : T
    : never;
};
