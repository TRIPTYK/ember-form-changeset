import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { ImmerChangeset } from 'ember-form-changeset-validations';

const dataWithNestedArray = {
  name: 'a',
  nested: [
    {
      hello: true,
    },
  ],
};

module('Unit | Immer changeset', function (hooks) {
  setupTest(hooks);

  test('It sets a key into the changeset', (assert) => {
    const changeset = new ImmerChangeset({});

    changeset.set('a', 'b');

    assert.strictEqual(changeset.get('a'), 'b');
  });

  test('It sets a deep key into the changeset', (assert) => {
    const changeset = new ImmerChangeset(dataWithNestedArray);

    changeset.set('nested.0.hello', 'false' as never);

    assert.strictEqual(changeset.get('name'), 'a');
    assert.strictEqual(changeset.get('nested.0.hello'), 'false' as never);
  });

  test('replace array', (assert) => {
    const changeset = new ImmerChangeset(dataWithNestedArray);

    changeset.set('nested.0', {
      hello: 'hellloooo' as never,
    });

    assert.strictEqual(changeset.get('nested.0.hello'), 'hellloooo' as never);
  });

  test('unexecute', (assert) => {
    const originalData = dataWithNestedArray;
    const changeset = new ImmerChangeset(originalData);

    changeset.set('nested.0.hello', false);

    changeset.execute();
    changeset.unexecute();

    assert.deepEqual(changeset.data, originalData);
  });

  test('save', (assert) => {
    const originalData = dataWithNestedArray;
    const changeset = new ImmerChangeset(originalData);

    changeset.set('nested.0.hello', false);

    changeset.save();

    // unexecute does nothing
    changeset.unexecute();

    assert.deepEqual(changeset.data, {
      ...originalData,
      nested: [
        {
          hello: false,
        },
      ],
    });
  });

  test('Trying to modify the inner changes and exposed data from the outside throws error', (assert) => {
    const changeset: any = new ImmerChangeset(dataWithNestedArray);

    assert.throws(
      () => changeset.get('nested').push([]),
      (e: Error) => e instanceof TypeError,
    );
    assert.throws(
      () => changeset.data.nested.push([]),
      (e: Error) => e instanceof TypeError,
    );
  });

  test('It executes changes to the changeset', (assert) => {
    const changeset = new ImmerChangeset(dataWithNestedArray);

    changeset.set('nested.0.hello', false);

    changeset.execute();

    assert.deepEqual(changeset.data, {
      name: 'a',
      nested: [
        {
          hello: false,
        },
      ],
    });
  });

  test('rollback', (assert) => {
    const changeset = new ImmerChangeset(dataWithNestedArray);

    changeset.set('nested.0.hello', false);
    changeset.set('name', 'false');

    changeset.rollback();

    assert.strictEqual(changeset.get('name'), 'a');
    assert.deepEqual(changeset.get('nested'), [{ hello: true }]);
  });

  test('changes', (assert) => {
    const changeset = new ImmerChangeset(dataWithNestedArray);

    changeset.set('nested.0.hello', false);
    changeset.set('name', 'false');
    changeset.set('name', 'fals');
    changeset.set('nested.0', {} as never);

    assert.deepEqual(changeset.changes, [
      {
        key: 'nested.0.hello',
        value: false,
      },
      {
        key: 'name',
        value: 'fals',
      },
      {
        key: 'nested.0',
        value: {},
      },
    ]);
  });

  // eslint-disable-next-line qunit/require-expect
  test('validate', async (assert) => {
    const data = dataWithNestedArray;

    const changeset = new ImmerChangeset(data);

    assert.false(changeset.isInvalid);
    assert.true(changeset.isValid);

    await changeset.validate((draft) => {
      assert.deepEqual(draft, data);
    });
  });

  test('addError', async (assert) => {
    const errors = {
      key: 'key',
      value: 'blblbl',
      originalValue: undefined,
    };

    const changeset = new ImmerChangeset(dataWithNestedArray);

    assert.false(changeset.isInvalid);
    assert.true(changeset.isValid);

    changeset.addError(errors);

    assert.false(changeset.isValid);
    assert.true(changeset.isInvalid);
    assert.deepEqual(changeset.errors, [errors]);
  });

  test('removeError', async (assert) => {
    const errors = {
      key: 'key',
      value: 'blblbl',
      originalValue: undefined,
    };

    const changeset = new ImmerChangeset(dataWithNestedArray);

    changeset.addError(errors);

    assert.deepEqual(changeset.errors, [errors]);

    changeset.removeError(errors.key);

    assert.false(changeset.isInvalid);
    assert.true(changeset.isValid);

    assert.deepEqual(changeset.errors, []);
  });

  // eslint-disable-next-line qunit/require-expect
  test('onSet', async (assert) => {
    const changeset = new ImmerChangeset(dataWithNestedArray);

    const cleanup = changeset.onSet((key: string) => {
      assert.strictEqual(key, 'name');
      assert.step('set');
    });

    changeset.set('name', 'false' as never);

    assert.verifySteps(['set']);

    cleanup();

    changeset.set('name', 'false' as never);

    assert.verifySteps([]);
  });
});
