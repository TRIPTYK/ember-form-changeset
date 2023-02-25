import { isChangeset } from './is-changeset';

export function isChangesetArray(keyValue: unknown) {
  return (
    Array.isArray(keyValue) &&
    keyValue.every((e) => {
      return isChangeset(e);
    })
  );
}
