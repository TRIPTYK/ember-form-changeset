'use strict';
const { existsSync } = require('fs');
const { join } = require('path');
const shortUUID = require('short-uuid');
const EOL = require('os').EOL;
const {
  askFields,
  invocationFor,
  fileMaps,
  mapCheckValueFunction,
  mapFillValueHelper,
  mapSaveFunction,
  mapFieldStartValue,
  addImportIfNotPresent,
  mapValidation,
  mapDTO,
} = require('./utils');
const defaultConfig = require('./default-config');

function mapConfigValues(e, config) {
  const configForField = config.overrides[e.type](e.type, e.name);
  if (!configForField) {
    throw new Error(`Please define a configuration for the type ${e.type}`);
  }
  const selector = configForField.selector ?? shortUUID('abcdefgh');
  const tests = configForField.tests(selector);

  return {
    name: e.name,
    type: e.type,
    validation: configForField.validation,
    hbs: configForField.hbs,
    selector: selector,
    tests: tests,
  };
}

module.exports = {
  availableOptions: [
    {
      name: 'ask',
      type: Boolean,
      default: false,
    },
  ],
  description: 'generates a base form component',
  fileMapTokens(options) {
    return fileMaps(options);
  },
  locals: async (options) => {
    // eslint-disable-next-line ember/no-string-prototype-extensions
    const filePath = join(process.cwd(), '.formconfig');
    let config = {};

    if (existsSync(`${filePath}.js`)) {
      config = require(filePath);
    }

    if (options === null || typeof options !== 'object') {
      throw new TypeError('getPathOptions first argument must be an object');
    }

    if (options.path || options.path === '') {
      // nothing ?
    } else {
      options.path = 'components';
    }

    const createSaveFunctionAssertions = [];
    const createCheckChangesetInitialValues = [];
    const createFillAssertions = [];

    const updateChangesetInitialValues = [];
    const updateCheckChangesetInitialValues = [];
    const updateSaveFunctionAssertions = [];
    const updateFillFunctions = [];

    const validationImports = [];
    const dtoFields = [];
    const fieldsFormatted = [];
    const validationFormatted = [];

    const imports = ["import click from '@ember/test-helpers/dom/click'"];

    if (['g', 'generate'].includes(process.argv[2]) && options.ask) {
      const defaultKeys = Object.keys(defaultConfig?.overrides ?? {});
      const overridenKeys = Object.keys(config?.overrides ?? {});

      const allKeys = overridenKeys
        .filter((key) => !defaultKeys.includes(key))
        .concat(defaultKeys);

      const fields = await askFields(allKeys);

      const fieldsWithConfig = fields.map((e) => {
        const defCfg = mapConfigValues(e, defaultConfig);
        const currentCfg = mapConfigValues(e, config);

        return {
          ...defCfg,
          ...currentCfg,
        };
      });

      for (const field of fieldsWithConfig) {
        createSaveFunctionAssertions.push(mapSaveFunction(field, 'create'));
        createCheckChangesetInitialValues.push(
          mapCheckValueFunction(field, 'create')
        );
        createFillAssertions.push(mapFillValueHelper(field, 'create'));
        updateChangesetInitialValues.push(mapFieldStartValue(field));
        updateSaveFunctionAssertions.push(mapSaveFunction(field, 'edit'));
        updateFillFunctions.push(mapFillValueHelper(field, 'edit'));
        updateCheckChangesetInitialValues.push(
          mapCheckValueFunction(field, 'edit')
        );
        addImportIfNotPresent(imports, field, 'create');
        addImportIfNotPresent(imports, field, 'edit');
        dtoFields.push(mapDTO(field));
        validationFormatted.push(mapValidation(field, validationImports));
        fieldsFormatted.push(field.hbs);
      }
    }

    options.createSaveFunctionAssertions =
      createSaveFunctionAssertions.join(EOL);
    options.createCheckChangesetInitialValues =
      createCheckChangesetInitialValues.join(EOL);
    options.createFillAssertions = createFillAssertions.join(EOL);
    options.updateChangesetInitialValues =
      updateChangesetInitialValues.join(EOL);
    options.updateCheckChangesetInitialValues =
      updateCheckChangesetInitialValues.join(EOL);
    options.updateSaveFunctionAssertions =
      updateSaveFunctionAssertions.join(EOL);
    options.updateFillFunctions = updateFillFunctions.join(EOL);
    options.imports = imports.join(`;${EOL}`);
    options.dtoFields = dtoFields.join(EOL);
    options.fieldsFormatted = fieldsFormatted.join(EOL);
    options.validationFormatted = validationFormatted.join(EOL);

    options.componentName = invocationFor(options);

    return options;
  },
};
