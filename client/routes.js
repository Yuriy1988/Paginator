/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './modules/App/App';
import TestPage from './modules/Test/pages/TestPage.js';

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="/test" />
    <Route
      path="/test"
      component={TestPage}
    />
  </Route>
);
