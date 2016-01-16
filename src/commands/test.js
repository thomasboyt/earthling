import karma from 'karma';
import path from 'path';

import generateWebpackConfig from '../generateWebpackConfig';

const earthlingRoot = path.join(__dirname, '../..');

export default function test(options) {
  const webpackConfig = generateWebpackConfig('test');

  const entry = path.join(earthlingRoot, 'app/testEntry.js');

  // TODO: make this user-configurable
  // * add extendable karma.config.js in project
  // * allow passing any Karma CLI options? depends on how malleable Karma CLI parsing is
  const karmaConfig = {
    browsers: ['Chrome'],
    frameworks: ['mocha'],
    reporters: ['mocha'],

    files: [
      entry
    ],

    preprocessors: {
      [entry]: ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackServer: {
      noInfo: true,
    },

    singleRun: options.singleRun,
  };

  const server = new karma.Server(karmaConfig);

  server.start();
}
