import createGlobChunk from './util/glob-chunk';
import path from 'path';
import webpack from 'webpack';

const earthlingRoot = path.join(__dirname, '../..');
const projectRoot = process.cwd();

export const projectPlugin = new webpack.DefinePlugin({
  __PROJECT__: JSON.stringify(path.join(projectRoot, 'app')),
});

export function getEnvPlugin(environment) {
  return new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: `"${environment}"`
    }
  });
}

function getLoaders(opts) {
  const loaders = [
    {
      test: /\.js$/,
      include: [
        path.join(earthlingRoot, './app')
      ],
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015'],
        plugins: ['syntax-async-functions', 'transform-object-rest-spread', 'transform-regenerator']
      }
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
  ];

  const projectBabelLoader = {
    test: /\.js$/,
    include: [
      path.join(projectRoot, './app')
    ],
    loader: 'babel-loader'
  };

  if (opts.hot) {
    projectBabelLoader.query = {
      presets: ['react-hmre']
    };
  }

  loaders.push(projectBabelLoader);

  return loaders;
}

export default function getBase(environment, opts={}) {
  const entry = {
    app: [path.join(earthlingRoot, './app/entry.js')],
  };

  // by default, attempt to resolve modules from earthling's node_modules/ before the project's
  // this ensures earthling and the project use the same versions of react, redux, etc.
  const resolve = {
    root: path.join(earthlingRoot, 'node_modules/'),
  };

  const resolveLoader = {
    modulesDirectories: [
      path.join(earthlingRoot, 'node_modules/'),
      path.join(projectRoot, 'node_modules/')
    ]
  };

  const output = {
    path: path.resolve(projectRoot, './build'),
    publicPath: '/',
    filename: '[name].bundle.js'
  };

  const plugins = [
    projectPlugin,

    getEnvPlugin(environment),

    createGlobChunk({
      name: 'vendor',

      patterns: [
        path.join(earthlingRoot, 'node_modules/**/*.js'),
        './node_modules/**/*.js',
        './app/vendor/**/*.js'
      ]
    }),
  ];

  const devServer = {
    historyApiFallback: true,
  };

  let devtool = 'source-map';

  // Production builds
  if (environment === 'production') {
    devtool = null;
    plugins.push(new webpack.optimize.UglifyJsPlugin());
  }

  // Hot module reloading
  if (opts.hot) {
    devServer.hot = true;

    plugins.push(new webpack.HotModuleReplacementPlugin());

    entry.app.push(
      'webpack/hot/dev-server',
      `webpack-dev-server/client?http://localhost:${opts.port}`
    );
  }

  return {
    entry,
    resolve,
    resolveLoader,
    output,
    plugins,
    devtool,
    devServer,

    module: {
      loaders: getLoaders(opts),
    },
  };
}
