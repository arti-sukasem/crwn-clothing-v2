import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // store parameters on the user web browser
import logger from "redux-logger";
import thunk from "redux-thunk"; // creating a new pattern using a logic for async functions inside middlewares
import createSagaMiddleware from "@redux-saga/core"; // either thunk or Saga

import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";


// Function generator - below to clarify the logger from redux-logger
// const loggerMiddleware = (store) => (next) => (action) => {
//     if(!action.type){
//         return next(action);
//     }

//     console.log('type: ', action.type);
//     console.log('payload: ', action.payload);
//     console.log('currentState: ', store.getState());

//     next(action);

//     console.log('next state: ', store.getState());
// }

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"]
  //blacklist: ["user"], //what we dont want to persist
};

const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, rootReducer);

//dispatch(action) --> middleware (store or run) --> reducer
//hiding logger - options: development or production || if filter true, return [] else return [{...}]
const middleWares = [
  process.env.NODE_ENV !== "production" && logger, sagaMiddleware
].filter(Boolean); //[loggerMiddleware]

// REDUX DEVTOOLS on web browser helps us to manipulate the complex state in React
const composedEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// compose paases multiple functions from the right to left
const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);
// export const store = createStore(rootReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
