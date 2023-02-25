import { ChangesetData } from 'ember-form-changeset-validations/types/pojo-changeset';
import { TypedBufferedChangeset } from 'ember-form-changeset-validations/types/typed-changeset';
import { isChangeset } from '../is-changeset';
import { isChangesetArray } from '../is-changeset-array';

export function data<T extends TypedBufferedChangeset>(
  changeset: T
): ChangesetData<T['data']> {
  const out: Record<string, unknown> = {};
  for (const key in changeset.data) {
    const keyValue = changeset.data[key];
    if (isChangeset(keyValue)) {
      out[key] = data(keyValue as TypedBufferedChangeset);
    } else if (isChangesetArray(keyValue)) {
      out[key] = (keyValue as TypedBufferedChangeset[]).map((kv) => data(kv));
    } else {
      out[key] = keyValue;
    }
  }
  return out as ChangesetData<T>;
}
