import { createContext, useEffect, useState } from "react";

import { addCollectionAndDocuments, getCateogriesAndDocuments } from "../utils/firebase/firebase.utils";
// import SHOP_DATA from '../shop-data.js';

import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

// as the actual value you want to access
export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
    const [ categoriesMap, setCategoriesMap ] = useState({});

    useEffect(() => {
        const getCategoryMap = async () => {
            const categoryMap = await getCateogriesAndDocuments();
            setCategoriesMap(categoryMap);
        };
        getCategoryMap();
    }, []);
    
    const value = { categoriesMap };

    // Only run once to update your database
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA)
    // }, []);

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
};