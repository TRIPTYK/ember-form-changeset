import { ExtendedChangeset } from 'ember-form-changeset-validations/changeset/extended-changeset';
import { module, test } from 'qunit';

module('Unit | Utility | extended-changeset', function () {
  test('pushInArray', function (assert) {
    const changeset = new ExtendedChangeset({
      array: ['amaury'],
    });
    changeset.pushInArray('array', 'string');
    assert.deepEqual(changeset.get('array'), ['amaury', 'string']);
  });
  test('removeFromArray', function (assert) {
    const changeset = new ExtendedChangeset({
      array: ['string'],
    });
    changeset.removeFromArray('array', 'string');
    assert.deepEqual(changeset.get('array'), []);
  });
  test('removeFromArrayIndex', function (assert) {
    const changeset = new ExtendedChangeset({
      array: ['name'],
    });
    changeset.removeFromArrayIndex('array', 0);
    assert.deepEqual(changeset.get('array'), []);
  });
});
