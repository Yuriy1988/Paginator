import { RECEIVE_LOGIN, RECEIVE_SIGNUP, LOGOUT, RECEIVE_AUTH_ERROR } from './AuthActions';

const initialState = {
  token: null,
  username: null,
  isAuthenticated: false,
};

const AuthReducer = (state = initialState, action) => {
  switch (action && action.type) {
    case RECEIVE_LOGIN: {
      return {
        ...state,
        token: action.token,
        username: action.username,
        isAuthenticated: true,
      };
    }
    case RECEIVE_SIGNUP: {
      return {
        ...state,
        token: action.token,
        username: action.username,
        isAuthenticated: true,
      };
    }
    case RECEIVE_AUTH_ERROR: {
      return {
        ...state,
        isAuthenticated: false,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        username: null,
      };
    }
    default: {
      return state;
    }
  }
};

export const getToken = state => state.auth.token;
export const getUsername = state => state.auth.username;
export const getIsAuthenticated = state => state.auth.isAuthenticated;

export default AuthReducer;
