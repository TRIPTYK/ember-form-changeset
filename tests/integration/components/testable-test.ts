import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { Changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import Validation from 'ember-form-changeset-validations/validator/testable';
import { TypedBufferedChangeset } from 'ember-form-changeset-validations';
import click from '@ember/test-helpers/dom/click';

module('Integration | Component | Testable', function (hooks) {
  setupRenderingTest(hooks);

  test('Create (empty changeset)', async function (assert) {
    this.set(
      'changeset',
      Changeset(
        {} as Record<keyof typeof Validation, unknown>,
        lookupValidator(Validation),
        Validation
      )
    );

    this.set('saveFunction', (_changeset: TypedBufferedChangeset) => {
      assert.step('saveFunction');
    });

    await render(
      hbs`<Testable @changeset={{this.changeset}} @saveFunction={{this.saveFunction}} />`
    );

    await click("button[type='submit']");
    assert.verifySteps(['saveFunction']);
  });

  test('Edit (populated changeset)', async function (assert) {
    this.set(
      'changeset',
      Changeset(
        {} as Record<keyof typeof Validation, unknown>,
        lookupValidator(Validation),
        Validation
      )
    );

    this.set('saveFunction', (_changeset: TypedBufferedChangeset) => {
      assert.step('saveFunction');
    });

    await render(
      hbs`<Testable @saveFunction={{this.saveFunction}} @changeset={{this.changeset}}/>`
    );

    await click("button[type='submit']");
    assert.verifySteps(['saveFunction']);
  });
});
