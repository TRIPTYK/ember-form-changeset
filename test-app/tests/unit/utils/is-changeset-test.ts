import { ImmerChangeset } from 'ember-form-changeset-validations';
import { isChangeset } from 'ember-form-changeset-validations/utils/is-changeset';
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
