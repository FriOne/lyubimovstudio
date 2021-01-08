const { preprocessTypescript } = require('@nrwl/cypress/plugins/preprocessor');
const { initPlugin } = require('cypress-plugin-snapshots/plugin');

module.exports = (on, config) => {
  on('file:preprocessor', preprocessTypescript(config));

  initPlugin(on, config);
};
