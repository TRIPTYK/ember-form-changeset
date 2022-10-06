import { Changeset } from 'ember-changeset';
import { isChangeset } from 'ember-form-changeset-validations/utils/is-changeset';
import { module, test } from 'qunit';

module('Unit | Utility | is-changeset', function () {
  test('returns true when a changeset is passed', function (assert) {
    let result = isChangeset(Changeset({}));
    assert.true(result);
  });
  test('returns true when a changeset is wrapped in a proxy', function (assert) {
    let result = isChangeset(new Proxy(Changeset({}), {}));
    assert.true(result);
  });
  test('returns false when an object is passed', function (assert) {
    let result = isChangeset({});
    assert.false(result);
  });
  test('returns false when a boolean is passed', function (assert) {
    let result = isChangeset(true);
    assert.false(result);
  });
  test('returns false when null is passed', function (assert) {
    let result = isChangeset(null);
    assert.false(result);
  });
  test('returns false when undefined is passed', function (assert) {
    let result = isChangeset(undefined);
    assert.false(result);
  });
});
