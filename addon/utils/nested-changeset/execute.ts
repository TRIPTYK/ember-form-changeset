import { Changeset } from 'ember-form-changeset-validations/types/typed-changeset';
import { recurseKey } from '../recurse-key';

export async function execute(changeset: Changeset) {
  for (const key in changeset.data) {
    await recurseKey(changeset, key, execute);
  }
  changeset.execute();
}
