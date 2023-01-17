import { CATEGORIES_ACTION_TYPES } from "./categories.types";

import { createAction } from "../../utils/reducer/reducer.utils";
import { getCateogriesAndDocuments } from "../../utils/firebase/firebase.utils";

// export const setCategories = (categoriesArray) =>
//   createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray);

export const fetchCategoriesStart = () =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray) =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  );

export const fetchCategoriesFailed = (error) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

// Thunk flow determines what we do when it succeeds or fails
export const fetchCategoriesAsync = () => async (dispatch) => {
  dispatch(fetchCategoriesStart());

  try {
    const categoriesArray = await getCateogriesAndDocuments();
    dispatch(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    dispatch(fetchCategoriesFailed(error));
  }
};
