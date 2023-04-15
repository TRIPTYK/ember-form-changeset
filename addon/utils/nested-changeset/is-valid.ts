import { Changeset } from 'ember-form-changeset-validations/types/typed-changeset';
import { isChangeset } from '../is-changeset';
import { isChangesetArray } from '../is-changeset-array';

export function isValid(changeset: Changeset) {
  for (const key in changeset.data) {
    const keyValue = changeset.get(key);
    if (
      isChangesetArray(keyValue) &&
      (keyValue as Changeset[]).some((c) => !isValid(c))
    ) {
      return false;
    }
    if (isChangeset(keyValue) && !isValid(keyValue as Changeset)) {
      return false;
    }
  }

  return changeset.isValid;
}
