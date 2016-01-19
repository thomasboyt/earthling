var webpack = require('webpack');
var webpackMerge = require('webpack-merge');

var config = require('./base');

module.exports = webpackMerge(config, {
  devtool: 'source-map',

  entry: {
    app: [
      config.entry.app,
      'webpack-hot-middleware/client'
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),

    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
});
