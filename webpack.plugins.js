const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = [
  new ForkTsCheckerWebpackPlugin({
    async: false
  }),
  new CopyPlugin([
    {
      from: './packages/services',
      to: 'services'
    },
    {
      from: './resources',
      to: 'resources'
    }
  ])
];
