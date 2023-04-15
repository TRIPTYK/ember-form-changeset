import { ExtendedChangeset } from 'ember-form-changeset-validations';
import { ImmerChangeset } from 'ember-form-changeset-validations/changeset/immer-changeset';

export function isChangeset(obj?: InstanceType<any>) {
  if (!obj) {
    return false;
  }

  if (obj instanceof ExtendedChangeset || obj instanceof ImmerChangeset) {
    return true;
  }

  return obj['__changeset__'] !== undefined;
}
