/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const nrwlReactConfig = require('@nrwl/react/plugins/webpack.js');

module.exports = (config) => {
  const isDevelopment = (config.mode === 'development');

  nrwlReactConfig(config);
  postcssConfigInFile(config);
  addTextFileLoader(config);
  fixStyleLoader(config);

  config.plugins.push(
      new webpack.EnvironmentPlugin({
        API_URL: '',
      }),
  );

  if (isDevelopment) {
    addHMR(config);
  }

  return config;
};

function addHMR(config) {
  config.entry = {
    ...config.entry,
    main: ['webpack/hot/dev-server', ...config.entry.main],
  };

  config.devServer = {
    ...config.devServer,
    hot: true,
    inline: true,
    historyApiFallback: true,
  };

  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  );
}

function addTextFileLoader(config) {
  config.module.rules.push({
    test: /\.txt$/i,
    use: 'raw-loader',
  });
}

function postcssConfigInFile(config) {
  for (const rule of config.module.rules) {
    if (!rule.test.test('test.css')) {
      continue;
    }

    for (const ruleOneOf of rule.oneOf) {
      if (!ruleOneOf.test.test('test.css')) {
        continue;
      }

      const postCssRuleUseIndex = ruleOneOf.use.findIndex(use => (
        use.loader && use.loader.includes('postcss-loader')
      ));

      if (postCssRuleUseIndex !== -1) {
        ruleOneOf.use[postCssRuleUseIndex] = { loader: 'postcss-loader' };
      }
    }
  }
}

function fixStyleLoader(config) {
  for (const rule of config.module.rules) {
    if (!rule.test.test('test.css')) {
      continue;
    }

    for (const ruleOneOf of rule.oneOf) {
      if (!ruleOneOf.test.test('test.css')) {
        continue;
      }

      const styleLoaderRuleUseIndex = ruleOneOf.use.findIndex(use => (
        use.loader && use.loader.includes('style-loader')
      ));

      if (styleLoaderRuleUseIndex !== -1 && config.mode === 'production') {
        ruleOneOf.use.splice(styleLoaderRuleUseIndex, 1);

        ruleOneOf.use.unshift(
          '@nrwl/web/node_modules/mini-css-extract-plugin/dist/loader',
          '@nrwl/web/src/utils/third-party/cli-files/plugins/raw-css-loader',
        );
      }
    }
  }
}
