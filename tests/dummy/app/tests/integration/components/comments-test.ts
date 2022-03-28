import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { Changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import Validation from 'dummy/validators/forms/comments';
import { TypedBufferedChangeset } from 'ember-form-changeset-validations';
import click from '@ember/test-helpers/dom/click';
import fillIn from '@ember/test-helpers/dom/fill-in';

/**
 * Serves as default template for test generation
 */
module('Integration | Component | Comment', function (hooks) {
  setupRenderingTest(hooks);

  test('Create (empty changeset)', async function (assert) {
    assert.expect(3);

    this.set(
      'changeset',
      Changeset(
        {} as Record<keyof typeof Validation, any>,
        lookupValidator(Validation),
        Validation
      )
    );

    this.set('saveFunction', (changeset: TypedBufferedChangeset) => {
      assert.strictEqual(changeset.get('content'), 'text');
    });

    await render(
      hbs`<Forms::Comments @changeset={{this.changeset}} @saveFunction={{this.saveFunction}}/>`
    );

    await click("button[type='submit']");
    assert.dom("button[type='submit']").isDisabled();

    assert.dom('#aaaa').hasValue('');

    await fillIn('#aaaa', 'text');

    await click("button[type='submit']");
  });

  test('Edit (populated changeset)', async function (assert) {
    assert.expect(2);

    this.set(
      'changeset',
      Changeset(
        {
          content: 'text',
        } as Record<keyof typeof Validation, any>,
        lookupValidator(Validation),
        Validation
      )
    );

    this.set('saveFunction', (changeset: TypedBufferedChangeset) => {
      assert.strictEqual(changeset.get('content'), 'text');
    });

    await render(
      hbs`<Forms::Comments @saveFunction={{this.saveFunction}} @changeset={{this.changeset}}/>`
    );

    assert.dom('#aaaa').hasValue('text');

    await click("button[type='submit']");
  });
});
