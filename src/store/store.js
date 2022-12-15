import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

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

//dispatch(action) --> middleware (store or run before) --> reducer
const middleWares = [logger]; //[loggerMiddleware]

// compose paases multiple functions from the right to left
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);