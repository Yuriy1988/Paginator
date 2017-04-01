export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';
export const RECEIVE_LOGIN_ERROR = 'RECEIVE_LOGIN_ERROR';
export const RECEIVE_SIGNUP = 'RECEIVE_SIGNUP';
export const RECEIVE_AUTH_ERROR = 'RECEIVE_AUTH_ERROR';
export const RECEIVE_SIGNUP_ERROR = 'RECEIVE_SIGNUP_ERROR';
export const LOGOUT = 'LOGOUT';

export const persistAuthData = (token, username) => {
  localStorage.setItem('token', token);
  localStorage.setItem('username', username);
};
export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
};

export const receiveLogin = (username, token) => {
  persistAuthData(token, username);
  return {
    type: RECEIVE_LOGIN,
    username,
    token,
  };
};

export const receiveLoginError = () => {
  clearAuthData();
  return {
    type: RECEIVE_LOGIN_ERROR,
  };
};

export const receiveSignUp = (username, token, avatarUrl) => {
  persistAuthData(token, username);
  return {
    type: RECEIVE_SIGNUP,
    username,
    token,
    avatarUrl,
  };
};
export const receiveSignUpError = (payload) => {
  clearAuthData();
  return {
    type: RECEIVE_SIGNUP_ERROR,
    payload,
  };
};

export const logout = () => {
  clearAuthData();
  return {
    type: LOGOUT,
  };
};

export function receiveAuthError() {
  return {
    type: RECEIVE_AUTH_ERROR,
  };
}
