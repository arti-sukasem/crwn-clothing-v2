// root-reducer is to combine all the small reducers to a single.
import { combineReducers } from 'redux';

import { userRudcer } from './user/user.reducer';
import { categoriesRudcer } from './categories/categories.reducer';
import { cartReducer } from './cart/cart.reducer';

export const rootReducer = combineReducers({
    user: userRudcer,
    categories: categoriesRudcer,
    cart: cartReducer,
});
