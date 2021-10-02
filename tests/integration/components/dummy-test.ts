import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import setupOnerror from '@ember/test-helpers/setup-onerror';
import { BufferedChangeset } from 'validated-changeset';
import click from '@ember/test-helpers/dom/click';
import fillIn from '@ember/test-helpers/dom/fill-in';

module('Integration | Component | dummy', function (hooks) {
  setupRenderingTest(hooks);

  test('Component should render with no error on create mode', async function (assert) {
    assert.expect(0);
    await render(hbs`<DummyForm @mode='create'/>`);
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

    await render(
      hbs`<DummyForm @saveFunction={{this.saveFunction}} @mode='create'/>`
    );

    await fillIn('input#text', 'test');

    await click('button');
  });

  test('Component should pass @entity properties to field', async function (assert) {
    assert.expect(3);
    const text = 'I love potatoes';

    this.set('saveFunction', function (changeset: BufferedChangeset) {
      assert.strictEqual(changeset.get('text'), text);
      assert.ok(
        changeset.isValid,
        'Triggers saveFunction and changeset is valid'
      );
    });

    this.set('article', {
      text,
    });

    await render(
      hbs`<DummyForm @saveFunction={{this.saveFunction}} @mode='update' @entity={{this.article}}/>`
    );

    assert.strictEqual(
      (this.element.querySelector('input#text') as HTMLInputElement).value,
      text,
      `Text is ${text}`
    );

    await click('button');
  });

  test('No entity on update throw Error', async function (assert) {
    assert.rejects(
      new Promise((res, rej) => {
        setupOnerror((error: Error) => {
          rej(error);
        });
        render(hbs`<DummyForm @mode='update'  />`).then(res);
      })
    );
  });

  test('Component submit should not trigger saveFunction when invalid', async function (assert) {
    assert.expect(0);

    this.set('saveFunction', function (_changeset: BufferedChangeset) {
      assert.ok(true);
    });

    await render(
      hbs`<DummyForm @saveFunction={{this.saveFunction}} @mode='create'/>`
    );

    await fillIn('input#text', '');

    await click('button');
  });
});
