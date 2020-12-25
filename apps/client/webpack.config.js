const path = require('path');
const webpack = require('webpack');
const postcssNested = require('postcss-nested');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const nrwlConfig = require('@nrwl/react/plugins/webpack.js');

module.exports = (config) => {
  const isDevelopment = (config.mode === 'development');

  nrwlConfig(config);
  addPostcssPlugins(config, [postcssNested()]);

  if (isDevelopment) {
    addHMR(config);
  }

  return config;
};

function addHMR(config) {
  config.entry = {
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

function addPostcssPlugins(config, plugins) {
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

      if (postCssRuleUseIndex) {
        ruleOneOf.use.push({
          loader: 'postcss-loader',
          options: { plugins },
        });

        continue;
      }

      const postCssRuleUse = ruleOneOf.use[postCssRuleUseIndex];
      const postCssLoader = postCssRuleUse.options.plugins;

      ruleOneOf.use[postCssRuleUseIndex].options.plugins = (loader) => {
        const originalPlugins = postCssLoader(loader);

        return [
          ...originalPlugins,
          ...plugins,
        ];
      };
    }
  }
}
