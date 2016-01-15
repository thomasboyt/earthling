import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import projectReducer from './projectReducer';
const middleware = require(__PROJECT__ + '/config/middleware').default;

const createStoreWithMiddleware = compose(
  applyMiddleware(thunkMiddleware)
)(createStore);

export default function createAppStore(data) {
  return createStoreWithMiddleware(projectReducer, data);
}
