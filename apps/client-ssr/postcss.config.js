/* eslint-disable @typescript-eslint/no-var-requires, no-undef */

module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-simple-vars'),
    require('autoprefixer')
  ]
};
