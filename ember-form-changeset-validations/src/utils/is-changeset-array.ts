import { isChangeset } from './is-changeset';

/**
 * Creates a changeset and wrap it into a proxy
 * If a proxy is not required, just use new changeset(...)
 * @deprecated will be removed in next major version
 */
export function isChangesetArray(keyValue: unknown) {
  return (
    Array.isArray(keyValue) &&
    keyValue.every((e) => {
      return isChangeset(e);
    })
  );
}
