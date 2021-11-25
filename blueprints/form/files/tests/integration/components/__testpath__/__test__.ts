import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { Changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import Validation from '<%= dummy ? "dummy" : project.pkg.name %>/validator/<%= dasherizedModuleName %>';
import { TypedBufferedChangeset } from 'ember-form-changeset-validations';
<%= imports %>

module('Integration | Component | <%= classifiedModuleName %>', function (hooks) {
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
      (<%= !createSaveFunctionAssertions ? '_' : '' %>changeset: TypedBufferedChangeset) => {
        assert.step('saveFunction');
<%= createSaveFunctionAssertions %>
      }
    );

    await render(
      hbs`<<%= componentName %> @changeset={{this.changeset}} @saveFunction={{this.saveFunction}} />`
    );


<%= createCheckChangesetInitialValues %>

<%= createFillAssertions %>

    await click("button[type='submit']");
    assert.verifySteps(['saveFunction']);
  });

  test('Edit (populated changeset)', async function (assert) {

    this.set(
      'changeset',
      Changeset(
        {
<%= updateChangesetInitialValues %>
        } as Record<keyof typeof Validation, unknown>,
        lookupValidator(Validation),
        Validation
      )
    );

    this.set(
      'saveFunction',
      (<%= !updateSaveFunctionAssertions ? '_' : '' %>changeset: TypedBufferedChangeset) => {
<%= updateSaveFunctionAssertions %>
        assert.step('saveFunction')
      }
    );

    await render(
      hbs`<<%= componentName %> @saveFunction={{this.saveFunction}} @changeset={{this.changeset}}/>`
    );
    
<%= updateCheckChangesetInitialValues %>
<%= updateFillFunctions %>

    await click("button[type='submit']");
    assert.verifySteps(['saveFunction']);
  });
});
