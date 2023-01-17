import { all, takeLatest, put, call } from "@redux-saga/core/effects";

import { getCateogriesAndDocuments } from "../../utils/firebase/firebase.utils";

import {
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
} from "./categories.action";

import { CATEGORIES_ACTION_TYPES } from "./categories.types";

// Thunk flow determines what we do when it succeeds or fails

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCateogriesAndDocuments, "categories");
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  ); // receive actions - if there is a bunch of the same actions, call the latest one
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]); // run everything inside all(call[generator]) until everything is done
}
