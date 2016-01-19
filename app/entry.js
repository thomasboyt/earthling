import 'babel-polyfill';

const init = require(__PROJECT__ + '/entry').default;

import React from 'react';
import ReactDOM from 'react-dom';

// Set up store
import createStore from './store';
const store = createStore();

// Set up router
const routes = require(__PROJECT__ + '/config/routes').default;
const history = require(__PROJECT__ + '/config/history').default;

if (init) {
  init(store);
}

import Root from './containers/Root';

ReactDOM.render((
  <Root store={store} routes={routes} history={history} />
), document.getElementById('container'));
