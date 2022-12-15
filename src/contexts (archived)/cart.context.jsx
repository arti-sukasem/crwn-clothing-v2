import { createContext, useState, useEffect, useReducer } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  } else {
    return cartItems.map((cartItem) =>
      cartItem.id === productToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }
};

const removeCartItems = (cartItems, productsToRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== productsToRemove.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemToCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

const INITIAL_STATE = {
  // isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

export const USER_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_TO_OPEN: "SET_TO_OPEN",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_CART_ITEMS":
      return {
        ...state,
        ...payload,
      };
    // case  'SET_TO_OPEN':
    //     return {
    //         ...state,
    //         isCartOpen: payload
    //     }
    default:
      throw new Error(`Unhandled type of ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [{ cartItems, cartCount, cartTotal }, dispatch] = useReducer(
    cartReducer,
    INITIAL_STATE
  );

  const updateCartItemReducer = (newCartItems, bool) => {
    const newCartCount = newCartItems.reduce(
      (total, newCartItem) => total + newCartItem.quantity,
      0
    );
    const newCartTotal = newCartItems.reduce(
      (total, newCartItem) => total + newCartItem.quantity * newCartItem.price,
      0
    );

    dispatch({
      type: USER_ACTION_TYPES.SET_CART_ITEMS,
      payload: {
        isCartOpen: bool,
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      },
    });
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemReducer(newCartItems);
  };

  const removeItemToCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemReducer(newCartItems);
  };

  const removeItemFromCart = (productsToRemove) => {
    const newCartItems = removeCartItems(cartItems, productsToRemove);
    updateCartItemReducer(newCartItems);
  };

  // const setIsCartOpen = (bool) => {
  //     dispatch({
  //         type: USER_ACTION_TYPES.SET_TO_OPEN,
  //         payload: bool
  //     })
  // };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    cartTotal,
    removeItemToCart,
    removeItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
