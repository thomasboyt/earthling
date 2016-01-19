import getBase, {projectPlugin, getEnvPlugin} from './base';

const baseConfig = getBase('test');

// TODO: should this merge off of base instead of picking specific stuff?
export default {
  devtool: 'inline-source-map',

  module: baseConfig.module,
  resolve: baseConfig.resolve,
  resolveLoader: baseConfig.resolveLoader,

  plugins: [
    projectPlugin,
    getEnvPlugin('test')
  ],
};
