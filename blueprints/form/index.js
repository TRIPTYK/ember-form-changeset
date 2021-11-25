'use strict';
const { existsSync } = require('fs');
const { join } = require('path');
const shortUUID = require('short-uuid');
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
    let config;

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

    const imports = ["import click from '@ember/test-helpers/dom/click';"];

    if (['g', 'generate'].includes(process.argv[2]) && options.ask) {
      const fields = await askFields(config ?? {});
      const fieldsWithConfig = fields.map((e) => {
        const configForField = config.overrides[e.type](e.type, e.name);
        if (!configForField) {
          throw new Error(
            `Please define a configuration for the type ${e.type}`
          );
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
        imports.push(addImportIfNotPresent(imports, field, 'create'));
        imports.push(addImportIfNotPresent(imports, field, 'edit'));
        dtoFields.push(mapDTO(field));
        validationFormatted.push(mapValidation(field, validationImports));
        fieldsFormatted.push(field.hbs);
      }
    }

    options.createSaveFunctionAssertions =
      createSaveFunctionAssertions.join('\\n');
    options.createCheckChangesetInitialValues =
      createCheckChangesetInitialValues.join('\\n');
    options.createFillAssertions = createFillAssertions.join('\\n');
    options.updateChangesetInitialValues =
      updateChangesetInitialValues.join('\\n');
    options.updateCheckChangesetInitialValues =
      updateCheckChangesetInitialValues.join('\\n');
    options.updateSaveFunctionAssertions =
      updateSaveFunctionAssertions.join('\\n');
    options.updateFillFunctions = updateFillFunctions.join('\\n');
    options.imports = imports.join('\\n');
    options.dtoFields = dtoFields.join('\\n');
    options.fieldsFormatted = fieldsFormatted.join('\\n');
    options.validationFormatted = validationFormatted.join('\\n');
    options.validationImports = validationImports.join('\\n');

    options.componentName = invocationFor(options);

    return options;
  },
};
