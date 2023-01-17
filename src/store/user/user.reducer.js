import { USER_ACTION_TYPES } from "./user.types";

const USER_INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
};

// Redux - receive/react to every actions from Reducers
export const userRudcer = (state = USER_INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: payload,
      };
    case USER_ACTION_TYPES.SIGN_IN_FAILURE:
      return {
        ...state,
        currentUser: payload,
      };
    case USER_ACTION_TYPES.SIGN_OUT_START:
    case USER_ACTION_TYPES.SIGN_OUT_FAILURE:
      return { ...state, error: payload };
     case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
      return { ...state, currentUser: payload };
    default:
      // None of the reducers being changed will remain the same
      return state;
  }
};
