/* eslint-disable @typescript-eslint/no-var-requires */
const { composePlugins, withNx } = require('@nrwl/webpack');
const { withReact } = require('@nrwl/react');
const webpack = require('webpack');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), (config) => {
  postcssConfigInFile(config);
  addTextFileLoader(config);
  fixStyleLoader(config);

  config.plugins.push(
    new webpack.EnvironmentPlugin({
      API_URL: '',
    }),
  );

  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  return config;
});

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
