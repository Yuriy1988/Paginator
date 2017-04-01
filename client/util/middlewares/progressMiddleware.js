import { showLoading, hideLoading } from 'react-redux-loading-bar';

const progress = store => next => (action) => {
  switch (action.type) {
    case '@redux-conn/BEGIN_GLOBAL_LOAD':
    case '@reduxAsyncConnect/BEGIN_GLOBAL_LOAD':
      store.dispatch(showLoading());
      break;
    case '@redux-conn/END_GLOBAL_LOAD':
    case '@reduxAsyncConnect/END_GLOBAL_LOAD':
      store.dispatch(hideLoading());
      break;
    default:
      break;
  }
  return next(action);
};

export default progress;
