import { Changeset } from 'ember-form-changeset-validations/types/typed-changeset';
import { isChangeset } from '../is-changeset';
import { isChangesetArray } from '../is-changeset-array';

export function isDirty(changeset: Changeset) {
  for (const key in changeset.data) {
    const keyValue = changeset.get(key);
    if (
      isChangesetArray(keyValue) &&
      (keyValue as Changeset[]).some((c) => isDirty(c))
    ) {
      return true;
    }
    if (isChangeset(keyValue) && isDirty(keyValue as Changeset)) {
      return true;
    }
  }
  return changeset.isDirty;
}
