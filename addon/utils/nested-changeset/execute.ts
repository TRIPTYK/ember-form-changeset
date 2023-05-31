import { Changeset } from 'ember-form-changeset-validations/types/typed-changeset';
import { recurseKey } from '../recurse-key';

/**
 * Creates a changeset and wrap it into a proxy
 * If a proxy is not required, just use new changeset(...)
 * @deprecated will be removed in next major version
 */
export async function execute(changeset: Changeset) {
  for (const key in changeset.data) {
    await recurseKey(changeset, key, execute);
  }
  changeset.execute();
}
