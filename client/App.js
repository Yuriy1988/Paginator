/**
 * Root Component
 * @flow
 */
import React from 'react';
import { Provider } from 'react-redux';
import { Router, applyRouterMiddleware } from 'react-router';
import { ReduxAsyncConnect } from 'redux-connect';

import './main.css';

const useReduxConnect = () => ({ renderRouterContext: (child, props) => <ReduxAsyncConnect {...props}>{child}</ReduxAsyncConnect> });

const App = (props) => {
  return (
    <Provider store={props.store} key="provider">
      <Router {...props.renderProps} render={applyRouterMiddleware(useReduxConnect())} />
    </Provider>
  );
};

App.propTypes = {
  store: React.PropTypes.object.isRequired, // eslint-disable-line
  renderProps: React.PropTypes.object.isRequired, // eslint-disable-line
};

export default App;
