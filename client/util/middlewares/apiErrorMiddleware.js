import { receiveAuthError } from '../../modules/Auth/AuthActions';

const apiErrorMiddleware = store => next => (action) => {
  if (action && action.payload && action.payload.error === 'Invalid token') {
    return store.dispatch(receiveAuthError());
  }

  return next(action);
};

export default apiErrorMiddleware;
