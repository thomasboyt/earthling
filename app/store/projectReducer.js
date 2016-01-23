import { combineReducers } from 'redux';

const context = require.context(__PROJECT__ + '/reducers', false, /.js$/);
context.keys().forEach(context);

const reducers = {};

const NAME_RE = /\/(.*)\.js$/;
context.keys().forEach((key) => {
  const name = key.match(NAME_RE)[1];

  if (name === 'index') {
    const indexReducers = context(key).default;
    for (let k of Object.keys(indexReducers)) {
      reducers[k] = indexReducers[k];
    }

  } else {
    reducers[name] = context(key).default;
  }
});

const projectReducer = combineReducers(reducers);

export default projectReducer;
