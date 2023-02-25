import { Changeset } from 'ember-changeset';
import { isChangeset } from 'ember-form-changeset-validations/utils/is-changeset';
import { isChangesetArray } from 'ember-form-changeset-validations/utils/is-changeset-array';
import { module, test } from 'qunit';

module('Unit | Utility | is-changeset-array', function () {
  test('returns true when a changeset array is passed', function (assert) {
    let result = isChangesetArray([Changeset({})]);
    assert.true(result);
  });
  test('returns false when an array with anything other than a changeset is within it', function (assert) {
    let result = isChangesetArray([new Proxy(Changeset({}), {}), {}]);
    assert.false(result);
  });
});
