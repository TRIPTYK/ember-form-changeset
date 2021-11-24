module.exports = {
  overrides: {
    checkbox: (type, name) => ({
      hbs: `<Input @type="checkbox" @checked={{changeset-get @changeset "${name}"}} {{on "change" ( fn this.updateValue "${name}")}} @name="${name}" data-test-input="${name}" />`,
      selector: `[data-test-input="${name}"]`,
      tests: (selector) => ({
        create: {
          checkValueAssert: `assert.dom('${selector}').isNotChecked()`,
          fillValueHelper: `await click('${selector}')`,
          fillValueHelperImport: `import click from '@ember/test-helpers/dom/click'`,
          saveFunctionAssert: `assert.strictEqual(changeset.get("${name}"), true)`,
        },
        edit: {
          startValue: true,
          checkValueAssert: `assert.dom('${selector}').isChecked()`,
          fillValueHelper: `await click('${selector}')`,
          fillValueHelperImport: `import click from '@ember/test-helpers/dom/click'`,
          saveFunctionAssert: `assert.strictEqual(changeset.get("${name}"), false)`,
        },
      }),
    }),
  },
};
