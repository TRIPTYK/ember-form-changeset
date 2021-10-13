import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { Changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import Validation from '<%= dummy ? "dummy" : project.pkg.name %>/validator/<%= dasherizedModuleName %>';
import { TypedBufferedChangeset } from 'ember-form-changeset-validations';
import click from '@ember/test-helpers/dom/click';
<% if(fields.length){ %>
import fillIn from '@ember/test-helpers/dom/fill-in';
<% } %>

module('Integration | Component | <%= classifiedModuleName %>', function (hooks) {
  setupRenderingTest(hooks);

  test('Create (empty changeset)', async function (assert) {
    assert.expect(<%= createAssertions %>);

    this.set(
      'changeset',
      Changeset(
        {} as Record<keyof typeof Validation, any>,
        lookupValidator(Validation),
        Validation
      )
    );

    this.set(
      'saveFunction',
      (<%= !createSaveFunctionAssertions ? '_' : '' %>changeset: TypedBufferedChangeset) => {
<%= createSaveFunctionAssertions %>
      }
    );

    await render(
      hbs`<<%= componentName %> @changeset={{this.changeset}} @saveFunction={{this.saveFunction}} />`
    );

    await click("button[type='submit']");
    assert.dom("button[type='submit']").isDisabled();

<%= createMainAssertions %>

<%= createFillAssertions %>

    await click("button[type='submit']");
  });

  test('Edit (populated changeset)', async function (assert) {
    assert.expect(<%= updateAssertions %>);

    this.set(
      'changeset',
      Changeset(
        {
<%= updateChangesetInitialValues %>
        } as Record<keyof typeof Validation, any>,
        lookupValidator(Validation),
        Validation
      )
    );

    this.set(
      'saveFunction',
      (<%= !updateSaveFunctionAssertions ? '_' : '' %>changeset: TypedBufferedChangeset) => {
<%= updateSaveFunctionAssertions %>
      }
    );

    await render(
      hbs`<<%= componentName %> @saveFunction={{this.saveFunction}} @changeset={{this.changeset}}/>`
    );

<%= updateMainAssertions %>

    await click("button[type='submit']");
  });
});
