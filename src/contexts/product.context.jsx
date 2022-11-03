import { createContext, useEffect, useState } from "react";

import PRODUCTS from '../shop-data.json';

import { createUserDocumentFromAuth, onAuthStateChangedListener} from "../utils/firebase/firebase.utils";

// as the actuak value you want to access
export const ProductsContext = createContext({
    product: [],
});

export const ProductProvider = ({ children }) => {
    const [ products, setProducts ] = useState(PRODUCTS);
    const value = { products };

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
};