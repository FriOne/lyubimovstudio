/* eslint-disable @typescript-eslint/no-var-requires, no-undef */
const webpack = require('webpack');
const { composePlugins, withNx } = require('@nrwl/webpack');
const { withReact } = require('@nrwl/react');
const reactWebpack = require('@nrwl/react/plugins/webpack.js');

module.exports = composePlugins(withNx(), withReact(), (config) => {
  reactWebpack(config);

  for (const rule of config.module.rules) {
    if (rule.test.test('test.png')) {
      rule.loader = 'null-loader';

      delete rule.use;
    }
  }

  config.module.rules.push({
    test: /\.css$/,
    loader: 'ignore-loader',
  }, {
    test: /\.txt$/i,
    use: 'raw-loader',
  });

  config.plugins.push(
    new webpack.EnvironmentPlugin(['API_URL']),
  );

  config.optimization.minimize = true;

  return config;
});
