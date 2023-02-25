import { TypedBufferedChangeset } from 'ember-form-changeset-validations/types/typed-changeset';
import { recurseKey } from '../recurse-key';

export async function validate(changeset: TypedBufferedChangeset) {
  for (const key in changeset.data) {
    await recurseKey(changeset, key, validate);
  }
  await changeset.validate();
}
