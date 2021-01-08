/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');

const nrwlReactConfig = require('@nrwl/react/plugins/webpack.js');
const {
  addTextFileLoader,
  postcssConfigInFile,
  fixStyleLoader,
  addHMR,
} = require('./webpack.config.utils');

module.exports = (config) => {
  const isDevelopment = (config.mode === 'development');

  nrwlReactConfig(config);
  postcssConfigInFile(config);
  addTextFileLoader(config);
  fixStyleLoader(config);

  config.plugins.push(
    new webpack.EnvironmentPlugin({ API_URL: '' }),
  );

  if (isDevelopment) {
    addHMR(config);
  }

  return config;
};
