import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
// import { UserProvider } from './contexts/user.context';
// import { CategoriesProvider } from './contexts/categories.context';
// import { CartProvider } from './contexts (archived)/cart.context';

import "./index.scss";

const rootElement = document.getElementById("root");

render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> 
      {/* loading={null} renders nothing til persist is loaded */}
        <BrowserRouter>
          {/* <UserProvider> */}
          {/* <CategoriesProvider> */}
          {/* <CartProvider> */}
          <App />
          {/* </CartProvider> */}
          {/* </CategoriesProvider> */}
          {/* </UserProvider> */}
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  rootElement
);
