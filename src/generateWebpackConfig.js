import merge from 'webpack-merge';
import requireFromProject from './util/requireFromProject';

import getBase from './webpack/base';
import test from './webpack/test';

export default function generateWebpackConfig(environment, opts) {
  const customConfig = requireFromProject('./webpack.config.js').default(environment);

  let config;
  if (environment === 'test') {
    config = test;
  } else {
    config = getBase(environment, opts);
  }

  return merge(config, customConfig);
}
