/* eslint-disable max-statements */
import { Changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import { validatePresence } from 'ember-changeset-validations/validators';
import type { TypedBufferedChangeset } from 'ember-form-changeset-validations';
import {
  data,
  errors,
  execute,
  isValid,
  validate,
} from 'ember-form-changeset-validations/utils/nested-changeset';
import { module, test } from 'qunit';

module('Unit | Utility | nested changeset', function () {
  function setupChangeset(validationMap?: Record<string, unknown>) {
    const innerChangeset = Changeset(
      {
        a: 'b',
      },
      ...(validationMap
        ? [lookupValidator(validationMap), validationMap]
        : [undefined, undefined])
    );

    const changesetWithNestedData = Changeset({
      shipments: [innerChangeset],
    }) as TypedBufferedChangeset;

    return { innerChangeset, changesetWithNestedData };
  }

  test('should trigger validate of nested changeset', async function (assert) {
    const { innerChangeset, changesetWithNestedData } = setupChangeset({
      a: () => {
        assert.step('validation');
      },
    });

    innerChangeset.set('a', 'a');

    await validate(changesetWithNestedData);

    assert.verifySteps(['validation', 'validation']);
  });

  test('should trigger execute on nested changesets', async function (assert) {
    const { innerChangeset, changesetWithNestedData } = setupChangeset();
    innerChangeset.set('a', 'c');
    await execute(changesetWithNestedData);
    assert.deepEqual(innerChangeset.data, {
      a: 'c',
    });
  });

  test('nested changeset should be invalid', async function (assert) {
    const { innerChangeset, changesetWithNestedData } = setupChangeset({
      a: validatePresence(false),
    });

    innerChangeset.set('a', 'c');

    const isChangesetValid = isValid(changesetWithNestedData);

    assert.false(isChangesetValid);
  });

  test('nested changeset should be valid', async function (assert) {
    const { innerChangeset, changesetWithNestedData } = setupChangeset({
      a: validatePresence(true),
    });

    innerChangeset.set('a', 'c');

    const isChangesetValid = isValid(changesetWithNestedData);

    assert.true(isChangesetValid);
  });

  test('should merge nested data', async function (assert) {
    const { changesetWithNestedData } = setupChangeset({
      a: validatePresence(true),
    });

    const changesetData = data(changesetWithNestedData);

    assert.deepEqual(changesetData, {
      shipments: [
        {
          a: 'b',
        },
      ],
    });
  });

  test('should merge pending data', async function (assert) {
    interface DTO {
      a: 'a';
      b: 'b';
      c: TypedBufferedChangeset<{
        d: 'd';
      }>;
      shipments: [
        TypedBufferedChangeset<{
          c: 'c';
          d: 'd';
          ships: [
            TypedBufferedChangeset<{
              e: 'e';
              f: 'f';
            }>
          ];
        }>
      ];
    }

    const changeset = Changeset({
      a: 'a',
      b: 'b',
      c: Changeset({
        d: 'b',
      }),
      shipments: [
        Changeset({
          c: 'c',
          d: 'd',
          ships: [
            Changeset({
              e: 'e',
              f: 'f',
            }),
          ],
        }),
      ],
    }) as TypedBufferedChangeset<DTO>;

    const changesetData = data(changeset);

    assert.deepEqual(changesetData, {
      a: 'a',
      b: 'b',
      c: {
        d: 'b',
      },
      shipments: [
        {
          c: 'c',
          d: 'd',
          ships: [
            {
              e: 'e',
              f: 'f',
            },
          ],
        },
      ],
    });
  });

  test('Pending changes should also be validated', async function (assert) {
    const { innerChangeset, changesetWithNestedData } = setupChangeset({
      a: () => assert.step('a'),
    });

    innerChangeset.set('a', 'c');

    const newValidationMap = {
      a: () => assert.step('b'),
    };

    const newChangeset = Changeset(
      {
        a: 'b',
      },
      lookupValidator(newValidationMap),
      newValidationMap
    );

    changesetWithNestedData.set('shipments', [
      ...changesetWithNestedData.get('shipments'),
      newChangeset,
    ]);

    await validate(changesetWithNestedData);

    assert.verifySteps(['a', 'a', 'b']);
  });

  test('Errors', async function (assert) {
    const { innerChangeset, changesetWithNestedData } = setupChangeset({
      a: [validatePresence(true)],
    });

    innerChangeset.set('a', undefined);

    await validate(changesetWithNestedData);

    assert.deepEqual(errors(changesetWithNestedData), [
      {
        key: 'shipments.a',
        validation: ["A can't be blank"],
      },
    ]);
  });
});
