import { ImmerChangeset } from 'ember-immer-changeset';
import { isChangeset } from 'ember-immer-changeset/utils/is-changeset';
import { module, test } from 'qunit';

module('Unit | Utility | is-changeset', function () {
  test('returns true when a changeset is passed', function (assert) {
    let result = isChangeset(new ImmerChangeset({}));
    assert.true(result);
  });
  test('returns false when else is passed', function (assert) {
    let result = isChangeset('reru');
    assert.false(result);
  });
});
