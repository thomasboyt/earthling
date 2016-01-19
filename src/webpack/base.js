import createGlobChunk from './util/glob-chunk';
import path from 'path';
import webpack from 'webpack';

const earthlingRoot = path.join(__dirname, '../..');
const projectRoot = process.cwd();

module.exports = {
  entry: {
    app: path.join(earthlingRoot, './app/entry.js'),
  },

  // by default, attempt to resolve modules from earthling's node_modules/ before the project's
  // this ensures earthling and the project use the same versions of react, redux, etc.
  resolve: {
    root: path.join(earthlingRoot, 'node_modules/'),
  },

  resolveLoader: {
    modulesDirectories: [
      path.join(earthlingRoot, 'node_modules/'),
      path.join(projectRoot, 'node_modules/')
    ]
  },

  output: {
    path: path.resolve(projectRoot, './build'),
    publicPath: '/',
    filename: '[name].bundle.js'
  },

  plugins: [
    new webpack.DefinePlugin({
      __PROJECT__: JSON.stringify(path.join(projectRoot, 'app')),
    }),

    createGlobChunk({
      name: 'vendor',

      // TODO: make this include earthling's node_modules/*
      patterns: [
        './node_modules/**/*.js',
        './vendor/**/*.js'
      ]
    }),
  ],

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.join(earthlingRoot, './app')
        ],
        loader: 'babel-loader',
        // TODO: pull this out to babelrc?
        query: {
          presets: ['react', 'es2015'],
          plugins: ['syntax-async-functions', 'transform-object-rest-spread', 'transform-regenerator']
        }
      },

      {
        test: /\.js$/,
        include: [
          path.join(projectRoot, './app')
        ],
        loader: 'babel-loader'
      },

      {
        test: /(?:\.woff$|\.woff2$|\.ttf$|\.svg$|\.eot$)/,
        loader: 'file-loader',
        query: {
          name: './font/[hash].[ext]'
        }
      },
      {
        test: /(?:\.png$|\.jpeg$|\.jpg$|\.gif$)/,
        loader: 'file-loader',
        query: {
          name: './assets/[hash].[ext]'
        }
      },
      {
        test: /(?:\.json)/,
        loader: 'json-loader'
      }

    ]
  },

  devServer: {
    hot: true,
    historyApiFallback: true,
  },
};
