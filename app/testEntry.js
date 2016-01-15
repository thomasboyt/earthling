import 'babel-polyfill';

const context = require.context('__PROJECT__/', true, /__tests__\/.*\.spec\.js$/);
context.keys().forEach(context);
