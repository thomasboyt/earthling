import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import generateWebpackConfig from '../generateWebpackConfig';

export default function serve(options) {
  const env = options.prod ? 'production' : 'development';

  const config = generateWebpackConfig(env, options);
  const compiler = webpack(config);

  startServer(compiler, config, options);
}

function startServer(compiler, config, options) {
  const port = options.port;

  const serverOptions = config.devServer;

  const server = new WebpackDevServer(compiler, serverOptions);

  server.listen(port, 'localhost', (err) => {
    if (err) {
      console.error(err);
    } else {
      console.info(`Webpack development server listening on port ${port}`);
    }
  });
}
