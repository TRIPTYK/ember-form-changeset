import { ExtendedChangeset } from 'ember-form-changeset-validations';

export function isChangeset(obj?: InstanceType<any>) {
  if (!obj) {
    return false;
  }

  if (obj instanceof ExtendedChangeset) {
    return true;
  }

  return obj['__changeset__'] !== undefined;
}
