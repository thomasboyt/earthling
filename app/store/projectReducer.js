import { combineReducers } from 'redux';

const context = require.context(__PROJECT__ + '/reducers', false, /.js$/);
context.keys().forEach(context);

const reducers = {};

const NAME_RE = /\/(.*)\.js$/;
context.keys().forEach((key) => {
  const name = key.match(NAME_RE)[1];
  reducers[name] = context(key).default;
});

const projectReducer = combineReducers(reducers);

export default projectReducer;
