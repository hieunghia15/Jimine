import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// import CategoriesAPI from './api/CategoriesAPI';
// import ColorAPI from './api/ColorAPI';
import UserAPI from "./api/UserAPI";
// import SizeAPI from './api/SizeAPI';
// import ProductsAPI from './api/ProductsAPI';

export const GlobalState = createContext();
export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  useEffect(()=> {
    if(localStorage.getItem('UserID')) {
      setToken(localStorage.getItem('UserID'));
    }
  },[])
  const state = {
    token: [token, setToken],
    UserAPI: UserAPI(token),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
