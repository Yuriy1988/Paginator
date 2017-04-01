import callApi from '../../util/apiCaller';

export const TEST_ACTION_1 = 'TEST_ACTION_1';
export const TEST_ACTION_2 = 'TEST_ACTION_2';
export const ADD_PROFILES = 'ADD_PROFILES';

export function testAction1(payload) {
  return {
    type: TEST_ACTION_1,
    payload,
  };
}

export function testAction2(payload) {
  return {
    type: TEST_ACTION_2,
    payload,
  };
}

export function receiveUsers(payload) {
  return {
    type: ADD_PROFILES,
    payload,
  };
}

/**
 * Fetch user profile data
 */
export function fetchProfiles() {
  return (dispatch) => {
    return callApi('users', 'get', undefined, { isJSON: false })
      .then((response) => {
        dispatch(receiveUsers(response));
      });
  };
}
