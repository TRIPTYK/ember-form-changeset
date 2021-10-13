'use strict';
const path = require('path');
const inquirer = require('inquirer');
const EOL = require('os').EOL;
const { existsSync } = require('fs');
const { join } = require('path');
const camelize = require('camelcase');
const shortuuid = require('short-uuid');
const stringUtil = require('ember-cli-string-utils');

function fileMaps(options) {
  let commandOptions = options;

  if (commandOptions.pod) {
    return {
      __componentname__() {
        return 'component';
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
}

function invocationFor(options) {
  let parts = options.entity.name.split('/');
  // eslint-disable-next-line ember/no-string-prototype-extensions
  return parts.map((p) => stringUtil.classify(p)).join('::');
}

/**
 * Ask fields name and type
 */
async function askFields() {
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
      choices: ['text', 'select', 'textarea'],
    });

    fields.push({
      name: fieldName,
      type,
      // eslint-disable-next-line ember/no-string-prototype-extensions
      id: stringUtil.dasherize(
        `${fieldName}-${shortuuid('abcdefghijklmnopqrstuvwxyz').generate()}`
      ),
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
}

function mapField({ type, name, id }, config) {
  if (config?.[type]) {
    return config?.[type](type, name);
  }

  /**
   * Defaults
   */
  switch (type) {
    case 'text': {
      const inputName = camelize(name);
      return `<label for="${id}"></label>${EOL}  <input name="${inputName}" id="${id}" type="${type}" {{on "change" (fn this.updateValue "${inputName}")}} value={{changeset-get @changeset "${inputName}"}}/>`;
    }
    case 'select':
      return `<PowerSelect @name="${camelize(name)}" />`;
    case 'textarea': {
      const inputName = camelize(name);
      return `<label for="${id}"></label>${EOL}  <textarea name="${inputName}" id="${id}" {{on "change" (fn this.updateValue "${inputName}")}} value={{changeset-get @changeset "${inputName}"}}/>`;
    }
  }
}

function mapValidation({ _type, name }, _config) {
  return `${camelize(name)}: [validatePresence(true)]`;
}

function mapDTOField({ _type, name }, _config) {
  return `${camelize(name)}: unknown`;
}

function mapCreateSaveFunctionAssertions({ _type, name }, config) {
  return `assert.strictEqual(changeset.get('${camelize(
    name
  )}'), 'Edited${name}')`;
}

function mapUpdateSaveFunctionAssertions({ _type, name }, config) {
  return `assert.strictEqual(changeset.get('${camelize(name)}'), '${name}')`;
}

function mapCreateMainAssertions({ _type, name, id }, config) {
  return `assert.dom('#${id}').hasValue('')`;
}

function mapUpdateMainAssertions({ _type, name, id }, config) {
  return `assert.dom('#${id}').hasValue('${name}')`;
}

function mapCreateFillAssertions({ _type, name, id }, config) {
  return `await fillIn('#${id}', 'Edited${name}')`;
}

function mapUpdateChangesetInitialValues({ _type, name, id }, config) {
  return `${camelize(name)}: '${name}'`;
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
    let config;

    console.log(options);

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

    options.fields = [];
    options.validationFormatted = '';
    options.fieldsFormatted = '';
    options.dtoFields = '';

    options.createAssertions = 1;
    options.createSaveFunctionAssertions = '';
    options.createMainAssertions = '';
    options.createFillAssertions = '';

    options.updateAssertions = 0;
    options.updateChangesetInitialValues = '';
    options.updateSaveFunctionAssertions = '';
    options.updateMainAssertions = '';

    if (['g', 'generate'].includes(process.argv[2]) && options.ask) {
      const fields = await askFields();
      options.createAssertions += fields.length * 2;
      options.updateAssertions += fields.length * 2;

      options.validationFormatted =
        '  ' +
        fields
          .map((field) => mapValidation(field, config, options))
          .join(`,${EOL}  `);
      options.fieldsFormatted =
        '  ' +
        fields
          .map((field) => mapField(field, config, options))
          .join(`${EOL}  `);
      options.dtoFields =
        '  ' +
        fields
          .map((field) => mapDTOField(field, config, options))
          .join(`;${EOL}  `) +
        ';';
      options.createSaveFunctionAssertions =
        '    ' +
        fields
          .map((field) =>
            mapCreateSaveFunctionAssertions(field, config, options)
          )
          .join(`;${EOL}    `) +
        ';';
      options.updateSaveFunctionAssertions =
        '    ' +
        fields
          .map((field) =>
            mapUpdateSaveFunctionAssertions(field, config, options)
          )
          .join(`;${EOL}    `) +
        ';';
      options.createMainAssertions =
        '    ' +
        fields
          .map((field) => mapCreateMainAssertions(field, config, options))
          .join(`;${EOL}    `) +
        ';';
      options.updateMainAssertions =
        '    ' +
        fields
          .map((field) => mapUpdateMainAssertions(field, config, options))
          .join(`;${EOL}    `) +
        ';';
      options.createFillAssertions =
        '    ' +
        fields
          .map((field) => mapCreateFillAssertions(field, config, options))
          .join(`;${EOL}    `) +
        ';';
      options.updateChangesetInitialValues =
        '    ' +
        fields
          .map((field) =>
            mapUpdateChangesetInitialValues(field, config, options)
          )
          .join(`,${EOL}    `);
      options.fields = fields;
    }

    options.componentName = invocationFor(options);

    return options;
  },
};
