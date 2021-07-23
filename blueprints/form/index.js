'use strict';
const path = require('path');
const config = require(path.join(process.cwd(), 'config/environment'));

module.exports = {
  description: 'generates a base form component',
  fileMapTokens(options) {
    let commandOptions = options;

    if (commandOptions.pod) {
      return {
        __name__() {
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
    } else if (
      !this.EMBER_GLIMMER_SET_COMPONENT_TEMPLATE ||
      commandOptions.componentStructure === 'classic'
    ) {
      return {
        __path__() {
          return 'components';
        },
        __templatepath__() {
          return 'templates/components';
        },
        __templatename__() {
          return options.dasherizedModuleName;
        },
      };
    } else if (
      this.EMBER_GLIMMER_SET_COMPONENT_TEMPLATE &&
      commandOptions.componentStructure === 'flat'
    ) {
      return {
        __path__() {
          return 'components';
        },
        __templatepath__() {
          return 'components';
        },
        __templatename__() {
          return options.dasherizedModuleName;
        },
      };
    } else if (
      this.EMBER_GLIMMER_SET_COMPONENT_TEMPLATE &&
      commandOptions.componentStructure === 'nested'
    ) {
      return {
        __path__() {
          return `components/${options.dasherizedModuleName}`;
        },
        __name__() {
          return 'index';
        },
        __templatepath__() {
          return `components/${options.dasherizedModuleName}`;
        },
        __templatename__() {
          return `index`;
        },
      };
    }
  },
  locals(options) {
    if (options === null || typeof options !== 'object') {
      throw new TypeError('getPathOptions first argument must be an object');
    }

    if (options.path || options.path === '') {
      // nothing ?
    } else {
      options.path = 'components';
    }

    return options;
  },

  // afterInstall(options) {
  //   // Perform extra work here.
  // }
};
