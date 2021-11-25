import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { Changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import Validation from 'dummy/validator/forms/potato';
import { TypedBufferedChangeset } from 'ember-form-changeset-validations';
import click from '@ember/test-helpers/dom/click';



module('Integration | Component | FormsPotato', function (hooks) {
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

    this.set(
      'saveFunction',
      (changeset: TypedBufferedChangeset) => {
        assert.step('saveFunction');
assert.strictEqual(changeset.get("ccc"), 'edited')\nassert.strictEqual(changeset.get("bbb"), 'edited')\nassert.strictEqual(changeset.get("ddd"), true)
      }
    );

    await render(
      hbs`<Forms::Potato @changeset={{this.changeset}} @saveFunction={{this.saveFunction}} />`
    );


assert.dom('[data-test-input="ccc"]').hasValue('')\nassert.dom('[data-test-input="bbb"]').hasValue('')\nassert.dom('[data-test-input="ddd"]').isNotChecked()

await fillIn('[data-test-input="ccc"]','edited')\nawait fillIn('[data-test-input="bbb"]','edited')\nawait click('[data-test-input="ddd"]')

    await click("button[type='submit']");
    assert.verifySteps(['saveFunction']);
  });

  test('Edit (populated changeset)', async function (assert) {

    this.set(
      'changeset',
      Changeset(
        {
ccc: hello,\nbbb: hello,\nddd: true,
        } as Record<keyof typeof Validation, unknown>,
        lookupValidator(Validation),
        Validation
      )
    );

    this.set(
      'saveFunction',
      (changeset: TypedBufferedChangeset) => {
assert.strictEqual(changeset.get("ccc"), 'hello')\nassert.strictEqual(changeset.get("bbb"), 'hello')\nassert.strictEqual(changeset.get("ddd"), false)
        assert.step('saveFunction')
      }
    );

    await render(
      hbs`<Forms::Potato @saveFunction={{this.saveFunction}} @changeset={{this.changeset}}/>`
    );
    
assert.dom('[data-test-input="ccc"]').hasValue('')\nassert.dom('[data-test-input="bbb"]').hasValue('')\nassert.dom('[data-test-input="ddd"]').isChecked()
await fillIn('[data-test-input="ccc"]','hello')\nawait fillIn('[data-test-input="bbb"]','hello')\nawait click('[data-test-input="ddd"]')

    await click("button[type='submit']");
    assert.verifySteps(['saveFunction']);
  });
});
