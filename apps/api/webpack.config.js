const path = require('path');
const { composePlugins, withNx } = require('@nrwl/webpack');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => {
  addCliEntry(config);
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  return config;
});

function addCliEntry(config) {
  config.entry = {
    cli: [path.resolve(__dirname, 'src/cli.ts')],
    ...config.entry
  };

  config.devtool = 'source-map';
  config.output.filename = '[name].js';
}
