import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { reducer as formReducer } from 'redux-form';

import app from './modules/App/AppReducer';
import paginatorReducer from './modules/Paginator/PaginatorReducer';
import test from './modules/Test/TestReducer';

export default combineReducers({
  app,
  test,
  reduxAsyncConnect,
  routing: routerReducer,
  paginatorReducer,
});
