/*
 * Export your react-router routes here.
 */

import React from 'react';
import {Route} from 'react-router';

import App from '../views/App';

export default (
  <Route handler={App}>

    <Route
      path="/"
      component={require('../views/Home/Handler').default} />

  </Route>
);
