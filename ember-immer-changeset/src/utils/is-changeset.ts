import { ImmerChangeset } from '../changeset/immer-changeset';

export function isChangeset(obj?: InstanceType<any>) {
  if (!obj) {
    return false;
  }

  if (obj instanceof ImmerChangeset) {
    return true;
  }

  return obj['__changeset__'] !== undefined;
}
