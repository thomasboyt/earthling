import webpack from 'webpack';
import Express from 'express';
import historyFallback from 'connect-history-api-fallback';
import webpackDevMiddleware from 'webpack-dev-middleware';

import generateWebpackConfig from '../generateWebpackConfig';

export default async function serve(options) {
  const config = generateWebpackConfig('development');
  const compiler = webpack(config);

  startServer(compiler, config, options);
}

function startServer(compiler, config, options) {
  const port = options.port;

  const app = new Express();

  const serverOptions = config.devServer;

  app.use(webpackDevMiddleware(compiler, serverOptions));
  app.use(historyFallback());

  // TODO: this should be configurable
  const index = process.cwd() + '/index.html';

  app.get('/index.html', (req, res) => {
    res.sendFile(index);
  });

  app.listen(port, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.info(`Webpack development server listening on port ${port}`);
    }
  });
}
