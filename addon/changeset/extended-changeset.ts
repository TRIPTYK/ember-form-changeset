/* eslint-disable ember/classic-decorator-no-classic-methods */
import { EmberChangeset } from 'ember-changeset';
import { Changeset } from 'ember-form-changeset-validations/types/typed-changeset';
import { ConditionalPick, StringKeyOf } from 'type-fest';

type ArrayKeys<DTO> = StringKeyOf<ConditionalPick<DTO, []>>;

export class ExtendedChangeset<T extends Record<string, any>>
  extends EmberChangeset
  implements Changeset<T>
{
  public get data(): T {
    return super.data as T;
  }

  pushInArray<K extends ArrayKeys<K>>(key: K, value: T[K]) {
    this.set(key, [...this.get(key), value]);
    return value;
  }

  removeFromArray<K extends ArrayKeys<K>>(key: K, value: T[K]) {
    this.set(
      key,
      this.get(key).filter((v: unknown[]) => v !== value)
    );
  }

  removeFromArrayIndex<Path extends string>(key: Path, index: number) {
    this.set(
      key,
      this.get(key).filter((_: unknown, i: number) => i !== index)
    );
  }
}
