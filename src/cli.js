import 'babel-polyfill';

import app from 'commander';

import {intOpt, listOpt} from './util/optTypes';

import init from './commands/init';
import build from './commands/build';
import serve from './commands/serve';
import test from './commands/test';

const pkg = require('../package.json');

app
  .version(pkg.version);

app.command('init <path>')
  .description('Create new site using the default template at [path]')
  .option('-f, --force', 'Overwrite existing files at [path]')
  .action(init);

app.command('build')
  .description('Build files to build/')
  .option('-o, --optimize', 'minify Webpack bundle')
  .option('--log-webpack', 'log Webpack stats to webpack.log.json')
  .action(build);

app.command('serve')
  .description('Build and serve files')
  .option('-p, --port <port>', 'port to serve on (defaults to 3000)', intOpt('port'), 3000)
  .option('-h, --hot', 'enable hot module reloading')
  .option('--prod', 'serve production build')
  .action(serve);

app.command('test')
  .description('Run tests through Karma')
  .option('--single-run', 'run tests only once')
  .option('--browsers <browsers>', 'browsers to run in (default: Chrome)', listOpt)
  .action(test);

app.parse(process.argv);

// No subcommand was passed
if (!process.argv.slice(2).length) {
  app.outputHelp();
}

process.on('unhandledRejection', (err) => {
  console.error(err.stack);
  process.exit(1);
});
