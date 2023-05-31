import { ExtendedChangeset } from 'ember-form-changeset-validations';
import { ImmerChangeset } from 'ember-form-changeset-validations/changeset/immer-changeset';

/**
 * Creates a changeset and wrap it into a proxy
 * If a proxy is not required, just use new changeset(...)
 * @deprecated will be removed in next major version
 */
export function isChangeset(obj?: InstanceType<any>) {
  if (!obj) {
    return false;
  }

  if (obj instanceof ExtendedChangeset || obj instanceof ImmerChangeset) {
    return true;
  }

  return obj['__changeset__'] !== undefined;
}
