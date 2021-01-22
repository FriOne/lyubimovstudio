/* eslint-disable @typescript-eslint/no-var-requires, no-undef */
const path = require('path');
const webpack = require('webpack');

module.exports = (config) => {
  const isDevelopment = (config.mode === 'development');

  if (!isDevelopment) {
    addCliEntry(config);
  }

  return config;
};

function addCliEntry(config) {
  config.entry = {
    cli: [path.resolve(__dirname, 'src/cli.ts')],
    ...config.entry
  };

  config.devtool = 'source-map';
  config.output.filename = '[name].js';
}
