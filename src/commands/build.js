import webpack from 'webpack';
import promiseWrap from '../util/promiseWrap';
import generateWebpackConfig from '../generateWebpackConfig';

function runWebpack(environment) {
  const config = generateWebpackConfig(environment);
  const compiler = webpack(config);

  return promiseWrap(compiler.run.bind(compiler))();
}

export default async function build(options={}) {
  const environment = options.dev ? 'development' : 'production';

  const stats = await runWebpack(environment);

  const jsonStats = stats.toJson();

  if (jsonStats.errors.length > 0) {
    console.log('*** Webpack errors:');

    jsonStats.errors.map((err) => {
      console.log(err);
      console.log('');
    });
  }

  if (jsonStats.warnings.length > 0) {
    console.log('*** Webpack warnings:');

    jsonStats.warnings.map((err) => {
      console.log(err);
      console.log('');
    });
  }

  if (jsonStats.errors.length > 0) {
    process.exit(1);
  }
}
