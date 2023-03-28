import { Changeset } from 'ember-form-changeset-validations/types/typed-changeset';
import { isChangeset } from './is-changeset';

export function doIfChangeset(
  possibleChangeset: unknown,
  action: (changeset: Changeset) => Promise<unknown> | unknown
) {
  if (isChangeset(possibleChangeset)) {
    return action(possibleChangeset as Changeset);
  }
}
