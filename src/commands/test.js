import karma from 'karma';
import path from 'path';

import generateWebpackConfig from '../generateWebpackConfig';

const earthlingRoot = path.join(__dirname, '../..');

export default async function test(options) {
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

  // if (options.singleRun) {
  //   try {
  //     await testSingle(karmaConfig);
  //   } catch(err) {
  //     console.error('Encountered Karma error');
  //     process.exit(1);
  //   }
  //
  //   return;
  // }
}

// function testSingle(opts) {
//   return new Promise((resolve, reject) => {
//     karma.runner.run(opts, (exitCode) => {
//       if (exitCode !== 0) {
//         reject(exitCode);
//       } else {
//         resolve(exitCode);
//       }
//     });
//   });
// }
