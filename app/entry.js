import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

// Set up store
import createStore from './store';
const store = createStore();

// Set up router
const routes = require(__PROJECT__ + '/config/routes').default;
import { browserHistory } from 'react-router';

import Root from './containers/Root';

ReactDOM.render((
  <Root store={store} routes={routes} history={browserHistory} />
), document.getElementById('container'));
