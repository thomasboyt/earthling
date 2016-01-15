import { createStore, applyMiddleware, compose } from 'redux';

import projectReducer from './projectReducer';

import DevTools from '../containers/DevTools';
const middleware = require(__PROJECT__ + '/config/middleware').default;

const createStoreWithMiddleware = compose(
  applyMiddleware(...middleware),
  DevTools.instrument()
)(createStore);

export default function createAppStore(data) {
  return createStoreWithMiddleware(projectReducer, data);
}
