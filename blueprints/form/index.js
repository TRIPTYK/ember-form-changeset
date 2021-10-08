'use strict';
const path = require('path');
const inquirer = require('inquirer');
const EOL = require('os').EOL;
const { existsSync } = require('fs');
const { join } = require('path');

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
    case 'text':
      return `<input name="${name}" type="type"/>`;
    case 'select':
      return `<PowerSelect @name="${name}" />`;
    case 'textarea':
      return `<FroalaEditor @name="${name}"/>`;
  }
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
    }
  },
  locals: async (options) => {
    const filePath = join(process.cwd(), '.formconfig');
    let config;

    if (existsSync(`${filePath}.js`)) {
      config = require(filePath);
    }

    console.log(config);

    if (options === null || typeof options !== 'object') {
      throw new TypeError('getPathOptions first argument must be an object');
    }

    if (options.path || options.path === '') {
      // nothing ?
    } else {
      options.path = 'components';
    }

    options.fields =
      '  ' +
      (await askFields())
        .map((field) => mapField(field, config, options))
        .join(`;${EOL}  `);

    return options;
  },

  // afterInstall(options) {
  //   // Perform extra work here.
  // }
};
