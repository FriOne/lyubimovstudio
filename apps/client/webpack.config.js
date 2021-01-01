const webpack = require('webpack');
const postcssNested = require('postcss-nested');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const nrwlConfig = require('@nrwl/react/plugins/webpack.js');

module.exports = (config) => {
  const isDevelopment = (config.mode === 'development');

  nrwlConfig(config);
  addPostcssPlugins(config, [postcssNested()]);

  config.plugins.push(
      new webpack.EnvironmentPlugin({ API_URL: '' }),
  );

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

      const postCssRuleUseIndex = ruleOneOf.use.findIndex(use => (
        use.loader && use.loader.includes('postcss-loader')
      ));

      if (postCssRuleUseIndex !== -1) {
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
}
