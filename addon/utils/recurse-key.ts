import { Changeset } from 'ember-form-changeset-validations/types/typed-changeset';
import { doIfChangeset } from './do-if-changeset';
import { isChangesetArray } from './is-changeset-array';

/**
 * Creates a changeset and wrap it into a proxy
 * If a proxy is not required, just use new changeset(...)
 * @deprecated will be removed in next major version
 */
export async function recurseKey(
  changeset: Changeset,
  key: string,
  action: (changeset: Changeset) => Promise<unknown> | unknown
) {
  const keyValue = changeset.get(key);
  if (isChangesetArray(keyValue)) {
    await Promise.all((keyValue as Changeset[]).map((o) => action(o)));
  }
  return doIfChangeset(keyValue, action);
}
