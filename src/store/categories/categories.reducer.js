import { CATEGORIES_ACTION_TYPES } from "./categories.types";

export const CATEGORIES_INITIAL_STATE = {
  categories: [],
  isLoading: false, // tracking in Thunk
  error: null, // tracking in Thunk
};

// Redux - receive/react to every actions from Reducers
export const categoriesRudcer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: payload, isLoading: false };

    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return { ...state, isLoading: true };

    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return {
        ...state,
        categories: payload,
        isLoading: false,
        error: payload,
      };
      
    default:
      return state;
  }
};
