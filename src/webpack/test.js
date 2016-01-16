var webpack = require('webpack');

var baseConfig = require('./base');

// TODO: should this merge off of base instead of picking specific stuff?
module.exports = {
  devtool: 'inline-source-map',

  module: baseConfig.module,
  resolve: baseConfig.resolve,
  resolveLoader: baseConfig.resolveLoader,

  plugins: [
    baseConfig.plugins[0],  // PROJECT definition

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"test"'
      }
    }),
  ],
};
