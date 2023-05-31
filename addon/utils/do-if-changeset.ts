import { Changeset } from 'ember-form-changeset-validations/types/typed-changeset';
import { isChangeset } from './is-changeset';

/**
 * Creates a changeset and wrap it into a proxy
 * If a proxy is not required, just use new changeset(...)
 * @deprecated will be removed in next major version
 */
export function doIfChangeset(
  possibleChangeset: unknown,
  action: (changeset: Changeset) => Promise<unknown> | unknown
) {
  if (isChangeset(possibleChangeset)) {
    return action(possibleChangeset as Changeset);
  }
}
