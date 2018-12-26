const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const path = require('path');
const paths = require("./paths");

module.exports = {
  entry: {
    vendor: paths.vendors,
  },
  mode: 'production',
  output: {
    path: path.resolve(paths.appPublic, 'dll'),
    filename: '[name].dll.js',
    library: 'vendor_dll',
  },
  performance: {
    hints: false,
  },
  plugins: [
    new WebpackBar({
      minimal: false,
      compiledIn: false,
    }),
    new webpack.DllPlugin({
      name: 'vendor_dll',
      path: path.resolve(paths.appPublic, 'dll', 'manifest.json'),
      context: paths.appPublic,
    }),
  ],
};
