import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import setupOnerror from '@ember/test-helpers/setup-onerror';

import { BufferedChangeset, Changeset } from 'validated-changeset';
import click from '@ember/test-helpers/dom/click';
import fillIn from '@ember/test-helpers/dom/fill-in';
import lookupValidator from 'ember-changeset-validations';
import { validatePresence } from 'ember-changeset-validations/validators';

const validations = {
  text: [validatePresence(true)],
};

module('Integration | Component | dummy', function (hooks) {
  setupRenderingTest(hooks);

  test('No changeset throws error', async function (assert) {
    assert.rejects(
      new Promise((res, rej) => {
        setupOnerror((error: Error) => {
          rej(error);
        });
        render(hbs`<DummyForm />`).then(res);
      })
    );
  });

  test('Incorrect changeset throws error', async function (assert) {
    this.set('changeset', {});
    assert.rejects(
      new Promise((res, rej) => {
        setupOnerror((error: Error) => {
          rej(error);
        });
        render(hbs`<DummyForm @changeset={{this.changeset}} />`).then(res);
      })
    );
  });

  test('Component should render with no error with empty changeset', async function (assert) {
    assert.expect(0);
    this.set('changeset', Changeset({}));
    await render(hbs`<DummyForm @changeset={{this.changeset}} />`);
  });

  test('Component submit should trigger saveFunction when valid', async function (assert) {
    assert.expect(2);

    this.set('saveFunction', function (changeset: BufferedChangeset) {
      assert.strictEqual(changeset.get('text'), 'test');
      assert.ok(
        changeset.isValid,
        'Triggers saveFunction and changeset is valid'
      );
    });

    this.set(
      'changeset',
      Changeset({}, lookupValidator(validations), validations)
    );

    await render(
      hbs`<DummyForm @changeset={{this.changeset}} @saveFunction={{this.saveFunction}}/>`
    );

    await fillIn('input#text', 'test');

    await click('button');
  });

  test('Component should pass @changeset properties to field', async function (assert) {
    assert.expect(3);
    const text = 'I love potatoes';

    this.set('saveFunction', function (changeset: BufferedChangeset) {
      assert.strictEqual(changeset.get('text'), text);
      assert.ok(
        changeset.isValid,
        'Triggers saveFunction and changeset is valid'
      );
    });

    this.set(
      'changeset',
      Changeset(
        {
          text,
        },
        lookupValidator(validations),
        validations
      )
    );

    await render(
      hbs`<DummyForm @saveFunction={{this.saveFunction}} @changeset={{this.changeset}}/>`
    );

    assert.strictEqual(
      (this.element.querySelector('input#text') as HTMLInputElement).value,
      text,
      `Text is ${text}`
    );

    await click('button');
  });

  test('Component submit should not trigger saveFunction when invalid', async function (assert) {
    assert.expect(0);

    this.set(
      'changeset',
      Changeset({}, lookupValidator(validations), validations)
    );

    this.set('saveFunction', function () {
      throw new Error('Should not throw here');
    });

    await render(
      hbs`<DummyForm @changeset={{this.changeset}} @saveFunction={{this.saveFunction}}/>`
    );

    await fillIn('input#text', '');

    await click('button');
  });
});
