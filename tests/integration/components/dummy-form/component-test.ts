/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, fillIn, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { TypedBufferedChangeset } from 'ember-form-changeset-validations';
import { DummyFormDTO } from 'dummy/tests/dummy/app/pods/components/dummy-form/component';

module('Integration | Component | dummy-form', function (hooks) {
  setupRenderingTest(hooks);

  test('triggers external action when valid and pass changeset', async function (assert) {
    // test double for the external action
    this.set(
      'externalAction',
      (changeset: TypedBufferedChangeset<DummyFormDTO>) => {
        assert.deepEqual(
          changeset.get('text'),
          'Hello, i am just a hooman',
          'submitted value is passed to external action'
        );
      }
    );

    await render(hbs`<DummyForm @saveFunction={{this.externalAction}} />`);
    await fillIn('input', 'Hello, i am just a hooman');
    await click('button');
  });

  test('doest not trigger external action when invalid', async function (assert) {
    await render(hbs`<DummyForm @saveFunction={{this.externalAction}} />`);
    await fillIn('input', '');
    await click('button');

    assert.equal(
      this.element
        .querySelector("input[name='is-valid']")
        ?.getAttribute('value'),
      'false'
    );
  });
});
