import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

//creating context
const AppContext = createContext({
  backendUrl: "",
  token: "",
  setToken: () => {},
  user: {},
  setUser: () => {},
});

//creating a wrapper for the context to use its values
function AppProvider({ children }) {
  //token state
  const [token, setToken] = useState(localStorage.getItem("token"));
  //userData state
  const [user, setUser] = useState();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  //setting token on relaod of page
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  //loading usersData
  const loadUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (token) {
      loadUserData();
    } else {
      setUser();
    }
  }, [token]);

  // groping the values to send across all the components
  const ctxVal = {
    backendUrl,
    token,
    setToken,
    user,
    setUser,
  };

  return <AppContext.Provider value={ctxVal}>{children}</AppContext.Provider>;
}

//creating custom hook for easy access
export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
