/*
 * Custom webpack config that gets merged into default config
 */

import webpack from 'webpack';

export default function generateConfig(environment) {
  // TODO: don't use a loader string... use a config obj instead

  let cssLoaderString = 'css-loader';

  if (environment === 'production') {
    cssLoaderString = 'css-loader?minimize=1';
  }

  return {
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: `style-loader!${cssLoaderString}`
        }
      ]
    }
  };
}
