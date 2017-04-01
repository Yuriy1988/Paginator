import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { reducer as formReducer } from 'redux-form';

import auth from './modules/Auth/AuthReducer';
import app from './modules/App/AppReducer';
import config from './modules/Config/ConfigReducer';
import test from './modules/Test/TestReducer';

export default combineReducers({
  app,
  reduxAsyncConnect,
  routing: routerReducer,
  test,
});
