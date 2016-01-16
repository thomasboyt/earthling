import 'babel-polyfill';

const context = require.context(__PROJECT__, true, /\.spec\.js$/);
context.keys().forEach(context);
