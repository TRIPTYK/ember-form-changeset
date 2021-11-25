/* eslint-disable no-undef */
const path = require('path');
const inquirer = require('inquirer');
const stringUtil = require('ember-cli-string-utils');

exports.fileMaps = function (options) {
  let commandOptions = options;

  if (commandOptions.pod) {
    return {
      __componentname__() {
        return 'component';
      },
      __testpath__() {
        return path.join(
          options.dasherizedModuleName.split('/').slice(1).join('/')
        );
      },
      __test__() {
        return `${options.dasherizedModuleName}-test`;
      },
      __name__() {
        return options.dasherizedModuleName;
      },
      __path__() {
        return path.join(
          options.podPath,
          options.locals.path,
          options.dasherizedModuleName
        );
      },
      __templatepath__() {
        return path.join(
          options.podPath,
          options.locals.path,
          options.dasherizedModuleName
        );
      },
      __templatename__() {
        return 'template';
      },
    };
  } else {
    return {
      __name__() {
        return options.dasherizedModuleName;
      },
      __path__() {
        return '';
      },
      __testpath__() {
        return 'components';
      },
      __test__() {
        return `${options.dasherizedModuleName}-test`;
      },
      __componentname__() {
        return path.join(options.locals.path, options.dasherizedModuleName);
      },
      __templatename__() {
        return path.join(
          'templates',
          'components',
          options.dasherizedModuleName
        );
      },
    };
  }
};

exports.invocationFor = function (options) {
  let parts = options.entity.name.split('/');
  // eslint-disable-next-line ember/no-string-prototype-extensions
  return parts.map((p) => stringUtil.classify(p)).join('::');
};

/**
 * Ask fields name and type
 */
exports.askFields = async function (types) {
  /**
   * @type Array<{ type: string; name: string }>
   */
  const fields = [];
  let canContinue = true;

  while (canContinue) {
    const { fieldName } = await inquirer.prompt({
      type: 'input',
      message: 'Nom du champ',
      name: 'fieldName',
    });

    const { type } = await inquirer.prompt({
      type: 'list',
      name: 'type',
      message: 'Type de champ',
      default: 'text',
      choices: types,
    });

    fields.push({
      name: fieldName,
      type,
    });

    const { choice } = await inquirer.prompt({
      type: 'rawlist',
      name: 'choice',
      message: 'Continue ?',
      default: 'y',
      choices: ['y', 'n'],
    });

    if (choice === 'n') {
      canContinue = false;
    }
  }

  return fields;
};

exports.mapCheckValueFunction = function (data, mode) {
  return data.tests[mode].checkValueAssert;
};

exports.mapFillValueHelper = function (data, mode) {
  return data.tests[mode].fillValueHelper;
};

exports.mapSaveFunction = function (data, mode) {
  return data.tests[mode].saveFunctionAssert;
};

exports.mapFieldStartValue = function (data) {
  return `${data.name}: ${data.tests.edit.startValue},`;
};

exports.mapDTO = function (data) {
  return `${data.name}: unknown,`;
};

exports.addImportIfNotPresent = function (importArray, data, mode) {
  if (!importArray.includes(data.tests[mode].fillValueHelperImport)) {
    importArray.push(data.tests[mode].fillValueHelperImport);
  }
};

const supportedValidator = [
  'validatePresence',
  'validationFormat',
  'validationConfirmation',
  'validateLength',
];

/**
 * Determines if the validatorField
 * @param {string} validatorField the import statement
 */
function resolveEmberChangesetValidationImport(validatorField) {
  const supportedValidatorImport = supportedValidator.find((sv) =>
    validatorField.includes(sv)
  );
  if (supportedValidatorImport) {
    return `import { ${supportedValidatorImport} } from "ember-changeset-validations"`;
  }
}

/**
 *
 * @param {Record<string, unknown>} field field's config
 * @param {Array<string>} validationImports the validation array
 * @returns {Array<string>} validation as array of strings
 */
exports.mapValidation = function (field, validationImports) {
  const validationsAsString = (
    Array.isArray(field.validation) ? field.validation : [field.validation]
  ).map((validation) => {
    if (typeof validation === 'object') {
      if (!validationImports.includes(validation)) {
        validationImports.push(validation.import);
      }
      return validation.validator;
    }

    const resolvedImportString =
      resolveEmberChangesetValidationImport(validation);

    if (!validationImports.includes(resolvedImportString)) {
      validationImports.push(resolvedImportString);
    }
    return validation;
  });
  return `${field.name}: [${validationsAsString}],`;
};
