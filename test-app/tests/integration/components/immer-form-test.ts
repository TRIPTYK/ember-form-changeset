/* eslint-disable ember/no-get */
/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';
import { TestContext, click, find, render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import {
  ImmerChangeset,
  ValidationFunction,
} from 'ember-form-changeset-validations';

interface IntegrationTestContext extends TestContext {
  changeset: ImmerChangeset;
}

module('Integration | Component | immer-form', function (hooks) {
  setupRenderingTest(hooks);

  // eslint-disable-next-line no-undef
  async function renderForm(this: TestContext, assert: Assert) {
    const changeset = new ImmerChangeset({});
    this.set('changeset', changeset);
    this.set<ValidationFunction<any>>('validationFunction', () => {
      assert.step('validation_called');
    });
    this.set('save', () => assert.step('save'));
    await render(hbs`
        <ImmerForm 
            @changeset={{this.changeset}} 
            @validationFunction={{this.validationFunction}}
            @onSubmit={{this.save}} >
          <button type="submit"></button>
        </ImmerForm>
      `);
  }

  test('it calls @onSubmit when form is submitted and is valid', async function (assert) {
    await renderForm.call(this, assert);

    await click('button');
    assert.verifySteps(['validation_called', 'save']);
  });

  test<IntegrationTestContext>('it does not call @onSubmit when form is submitted and changeset is not valid', async function (assert) {
    await renderForm.call(this, assert);
    this.set<ValidationFunction<any>>('validationFunction', () => {
      assert.step('validation_called');
      this.changeset.addError({
        key: 'name',
        value: 'blblbl',
        originalValue: undefined,
      });
    });

    await click('button');
    assert.verifySteps(['validation_called']);
  });

  test('Cannot submit while action is still in progress', async function (assert) {
    await renderForm.call(this, assert);
    find('button')?.click();
    find('button')?.click();
    await settled();
    assert.verifySteps(['validation_called', 'save']);
  });
});
