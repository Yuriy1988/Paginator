/**
 * Main store function
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { browserHistory, hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import progress from './util/middlewares/progressMiddleware';
import apiErrorMiddleware from './util/middlewares/apiErrorMiddleware';
import DevTools from './modules/App/components/DevTools';
import rootReducer from './reducers';

export function configureStore(initialState = {}) {
  // Middleware and store enhancers
  const enhancers = [
    applyMiddleware(apiErrorMiddleware, routerMiddleware(process.env.IS_MOBILE ? hashHistory : browserHistory), thunk, progress),
  ];

  if (process.env.CLIENT && process.env.NODE_ENV === 'development') {
    const logger = createLogger({
      duration: true,
      collapsed: true,
    });
    enhancers.push(applyMiddleware(logger));

    // Enable DevTools only when rendering on client and during development.
    enhancers.push(window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument());
  }

  const store = createStore(rootReducer, initialState, compose(...enhancers));

  // For hot reloading reducers
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
