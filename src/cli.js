import 'babel-polyfill';

import app from 'commander';

import {intOpt} from './util/optTypes';

import generate from './commands/new';
import build from './commands/build';
import serve from './commands/serve';

const pkg = require('../package.json');

app
  .version(pkg.version);

app.command('new <path>')
  .description('Create new site using the default template at [path]')
  .option('-f, --force', 'Overwrite existing files at [path]')
  .option('--npm-install', 'Run NPM install')
  .action(generate);

app.command('build')
  .description('Build files to build/')
  .option('-o, --optimize', 'minify Webpack bundle')
  .option('--log-webpack', 'log Webpack stats to webpack.log.json')
  .action(build);

app.command('serve')
  .description('Build and serve files')
  .option('-p, --port <port>', 'port to serve on (defaults to 3000)', intOpt('port'), 3000)
  .action(serve);

app.parse(process.argv);

// No subcommand was passed
if (!process.argv.slice(2).length) {
  app.outputHelp();
}

process.on('unhandledRejection', (err) => {
  console.error(err.stack);
});
