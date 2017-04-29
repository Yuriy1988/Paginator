import { TEST_ACTION_1, TEST_ACTION_2, ADD_PROFILES } from './TestActions';

const initialState = {
  profiles: [],
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEST_ACTION_1: {
      return { ...state, ...action.payload };
    }
    case TEST_ACTION_2: {
      return { ...state, ...action.payload };
    }
    case ADD_PROFILES: {
      return { ...state, profiles: [...action.payload] };
    }
    default: {
      return state;
    }
  }
};

export const getProfiles = state => (state.test.profiles);
export const getAllPages = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 2, 7, 8, 9, 9, 2, 2, 3, 34, 234, 2];

export default UserReducer;
