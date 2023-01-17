import { all, call } from "@redux-saga/core/effects";

import { categoriesSaga } from "./categories/categories.saga";

import { userSaga } from "./user/user.saga";

// redux-saga is a middleware where it updates the states / fire a new action (side-effects)
// after reducer (better for complex application or testing)
// Generator function - yield command lines - useful for pause a function or continue left functions
export function* rootSaga() {
  yield all([call(categoriesSaga), call(userSaga)]);
}
