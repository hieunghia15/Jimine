import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const GlobalState = createContext();
export const DataProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [callback, setCallback] = useState(false);
  const [token, setToken] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("UserID")) {
      setToken(localStorage.getItem("UserID"));
    }
  }, []);

  useEffect(() => {
    if (token !== false) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/find", {
            headers: { Authorization: token },
          });
          setUser(res.data.user);
        } catch (err) {
          alert(err.response.data.msg);
        }
      };
      getUser();
    }
  }, [token, callback]);
  const state = {
    token: [token, setToken],
    user: [user, setUser],
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
