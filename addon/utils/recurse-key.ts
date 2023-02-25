import { TypedBufferedChangeset } from 'ember-form-changeset-validations/types/typed-changeset';
import { doIfChangeset } from './do-if-changeset';
import { isChangesetArray } from './is-changeset-array';

export async function recurseKey(
  changeset: TypedBufferedChangeset,
  key: string,
  action: (changeset: TypedBufferedChangeset) => Promise<unknown> | unknown
) {
  const keyValue = changeset.get(key);
  if (isChangesetArray(keyValue)) {
    await Promise.all(
      (keyValue as TypedBufferedChangeset[]).map((o) => action(o))
    );
  }
  return doIfChangeset(keyValue, action);
}
