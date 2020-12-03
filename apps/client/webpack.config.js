const nrwlConfig = require('@nrwl/react/plugins/webpack.js');
const postcssNested = require('postcss-nested');

module.exports = (config) => {
  nrwlConfig(config);
  addPostcssPlugins(config, [postcssNested()]);

  return config;
};

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
