import merge from 'webpack-merge';
import requireFromProject from './util/requireFromProject';

import development from './webpack/development';
import production from './webpack/production';
import test from './webpack/test';

const envConfigs = {
  development, production, test
};

export default function generateWebpackConfig(environment) {
  const customConfig = requireFromProject('./webpack.config.js').default(environment);

  const config = envConfigs[environment];

  if (!config) {
    throw new Error(`Invalid environment for webpack config: ${environment}`);
  }

  return merge(config, customConfig);
}
