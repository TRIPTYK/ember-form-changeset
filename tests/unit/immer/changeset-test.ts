import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { ImmerChangeset } from 'ember-form-changeset-validations/changeset/immer-changeset';

module('Unit | Immer changeset', function (hooks) {
  setupTest(hooks);

  test('It sets a key into the changeset', (assert) => {
    const changeset = new ImmerChangeset({});

    changeset.set('a', 'b');

    assert.strictEqual(changeset.get('a'), 'b');
  });

  test('It sets a deep key into the changeset', (assert) => {
    const changeset = new ImmerChangeset({
      name: 'a',
      nested: [
        {
          hello: true,
        },
      ],
    });

    changeset.set('nested.0.hello', 'false');

    assert.strictEqual(changeset.get('name'), 'a');
    assert.strictEqual(changeset.get('nested.0.hello'), 'false');
  });

  test('replace array', (assert) => {
    const changeset = new ImmerChangeset({
      name: 'a',
      nested: [
        {
          hello: true,
        },
      ],
    });

    changeset.set('nested.0', {
      hello: 'hellloooo',
    });

    assert.strictEqual(changeset.get('nested.0.hello'), 'hellloooo');
  });

  test('unexecute', (assert) => {
    const originalData = {
      name: 'a',
      nested: [
        {
          hello: true,
        },
      ],
    };
    const changeset = new ImmerChangeset(originalData);

    changeset.set('nested.0.hello', false);

    changeset.execute();
    changeset.unexecute();

    assert.deepEqual(changeset.data, originalData);
  });

  test('save', (assert) => {
    const originalData = {
      name: 'a',
      nested: [
        {
          hello: true,
        },
      ],
    };
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
    const changeset: any = new ImmerChangeset({
      name: 'a',
      nested: [
        {
          hello: true,
        },
      ],
    });

    assert.throws(
      () => changeset.get('nested').push([]),
      (e: Error) => e instanceof TypeError && e.message.includes('non-writable')
    );
    assert.throws(
      () => changeset.data.nested.push([]),
      (e: Error) => e instanceof TypeError && e.message.includes('non-writable')
    );
  });

  test('It executes changes to the changeset', (assert) => {
    const changeset = new ImmerChangeset({
      name: 'a',
      nested: [
        {
          hello: true,
        },
      ],
    });

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
    const changeset = new ImmerChangeset({
      name: 'a',
      nested: [
        {
          hello: true,
        },
      ],
    });

    changeset.set('nested.0.hello', false);
    changeset.set('name', 'false');

    changeset.rollback();

    assert.strictEqual(changeset.get('name'), 'a');
    assert.deepEqual(changeset.get('nested'), [{ hello: true }]);
  });

  test('changes', (assert) => {
    const changeset = new ImmerChangeset({
      name: 'a',
      nested: [
        {
          hello: true,
        },
      ],
    });

    changeset.set('nested.0.hello', false);
    changeset.set('name', 'false');
    changeset.set('name', 'fals');
    changeset.set('nested.0', {});

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
    const data = {
      name: 'a',
      nested: [
        {
          hello: true,
        },
      ],
    };
    const errors = [
      {
        path: 'key',
        value: 'blblbl',
        originalValue: undefined,
      },
    ];

    const changeset = new ImmerChangeset(data);

    assert.false(changeset.isInvalid);
    assert.true(changeset.isValid);

    await changeset.validate((draft) => {
      assert.deepEqual(draft, data);
      return errors;
    });

    assert.false(changeset.isValid);
    assert.true(changeset.isInvalid);
    assert.deepEqual(changeset.errors, errors);
  });

  test('addError', async (assert) => {
    const data = {
      name: 'a',
      nested: [
        {
          hello: true,
        },
      ],
    };

    const errors = {
      path: 'key',
      value: 'blblbl',
      originalValue: undefined,
    };

    const changeset = new ImmerChangeset(data);

    assert.false(changeset.isInvalid);
    assert.true(changeset.isValid);

    changeset.addError(errors.path, errors);

    assert.false(changeset.isValid);
    assert.true(changeset.isInvalid);
    assert.deepEqual(changeset.errors, [errors]);
  });

  test('removeError', async (assert) => {
    const data = {
      name: 'a',
      nested: [
        {
          hello: true,
        },
      ],
    };

    const errors = {
      path: 'key',
      value: 'blblbl',
      originalValue: undefined,
    };

    const changeset = new ImmerChangeset(data);

    changeset.addError(errors.path, errors);

    assert.deepEqual(changeset.errors, [errors]);

    changeset.removeError(errors.path);

    assert.false(changeset.isInvalid);
    assert.true(changeset.isValid);

    assert.deepEqual(changeset.errors, []);
  });
});
