import { TypedBufferedChangeset } from 'ember-form-changeset-validations/types/typed-changeset';
import { isChangeset } from './is-changeset';

export function doIfChangeset(
  possibleChangeset: unknown,
  action: (changeset: TypedBufferedChangeset) => Promise<unknown> | unknown
) {
  if (isChangeset(possibleChangeset)) {
    return action(possibleChangeset as TypedBufferedChangeset);
  }
}
