import { createStore, applyMiddleware, compose } from 'redux';

import projectReducer from './projectReducer';
const middleware = require(__PROJECT__ + '/config/middleware').default;

const createStoreWithMiddleware = compose(
  applyMiddleware(...middleware)
)(createStore);

export default function createAppStore(data) {
  return createStoreWithMiddleware(projectReducer, data);
}
