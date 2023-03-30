import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { ExtendedChangeset } from 'ember-form-changeset-validations';

module('Integration | Component | changeset-form', function (hooks) {
  setupRenderingTest(hooks);

  async function renderForm() {
    await render(hbs`
        <ChangesetForm @changeset={{this.changeset}} @onSubmit={{this.save}}>
          <button type="submit"></button>
        </ChangesetForm>
      `);
  }

  test('it calls @onSubmit when form is submitted and is valid', async function (assert) {
    this.set('changeset', new ExtendedChangeset({}));
    this.set('save', () => assert.step('save'));

    await renderForm();

    await click('button');
    assert.verifySteps(['save']);
  });

  test('it does not call @onSubmit when form is submitted and changeset is not valid', async function (assert) {
    const changeset = new ExtendedChangeset({});
    this.set('changeset', changeset);
    this.set('save', () => assert.step('save'));

    changeset.addError('', '');

    await renderForm();

    await click('button');
    assert.verifySteps([]);
  });
});
