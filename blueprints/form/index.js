'use strict';
const path = require('path');
const inquirer = require('inquirer');
const EOL = require('os').EOL;
const { existsSync } = require('fs');
const { join } = require('path');
const camelize = require('camelcase');
const { v4: uuidv4 } = require('uuid');

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

function mapField({ type, name }, config) {
  if (config?.[type]) {
    return config?.[type](type, name);
  }

  /**
   * Defaults
   */
  switch (type) {
    case 'text': {
      const inputName = camelize(name);
      const id = uuidv4();
      return `<label for="${id}"></label>${EOL}  <input name="${inputName}" id="${id}" type="type"/>`;
    }
    case 'select':
      return `<PowerSelect @name="${camelize(name)}" />`;
    case 'textarea':
      return `<FroalaEditor @name="${camelize(name)}"/>`;
  }
}

function mapValidation({ _type, name }, _config) {
  return `${camelize(name)}: [validatePresence(true)]`;
}

module.exports = {
  description: 'generates a base form component',
  fileMapTokens(options) {
    let commandOptions = options;

    if (commandOptions.pod) {
      return {
        __componentname__() {
          return 'component';
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
        __path__() {
          return '';
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
  },
  locals: async (options) => {
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

    if (['g', 'generate'].includes(process.argv[2])) {
      const fields = await askFields();
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
    }

    return options;
  },
};
