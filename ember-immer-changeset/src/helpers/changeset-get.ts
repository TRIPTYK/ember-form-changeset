import { helper } from '@ember/component/helper';
import { ImmerChangeset } from '..';

function changesetGet([changeset, key]: [ImmerChangeset | undefined, string]) {
  return changeset?.get(key);
}

export default helper(changesetGet);
