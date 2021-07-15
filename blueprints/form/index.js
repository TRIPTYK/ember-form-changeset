'use strict';

module.exports = {
  description: '',
  fileMapTokens(options) {
    return {
      __templatepath__(options) {
        if (options.pod) return options.dasherizedModuleName;
        else return 'templates';
      },
      __templatename__(options) {
        if (options.pod) return 'template';
        else return options.blueprintName;
      },
    };
  },
  locals(options) {
    return options;
  },

  // afterInstall(options) {
  //   // Perform extra work here.
  // }
};
