import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  createUserDocumentFromAuth,
  getCurrentUser,
  onAuthStateChangedListener,
} from "./utils/firebase/firebase.utils";
import { checkUserSession, setCurrentUser } from "./store/user/user.action";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";

const App = () => {
  const dispatch = useDispatch();

  // no need to fill up the render state (warnings)
  // since this is used for initialization
  // USER REDUCER
  useEffect(() => {
    // const unsubscribe = onAuthStateChangedListener((user) => {
    //   if (user) {
    //     createUserDocumentFromAuth(user);
    //   }
    //   dispatch(setCurrentUser(user));
    // });
    // return unsubscribe;

    dispatch(checkUserSession());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="authentication" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
