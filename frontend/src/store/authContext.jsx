import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  token: "",
  handleTokenAdd: () => {},
  handleTokenRemone: () => {},
});

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState("");
  const [user, setUser] = useState();
  function handleTokenAdd(tkn, userData) {
    const userData2 = JSON.parse(userData);
    setToken(tkn);
    setUser(userData2);
    localStorage.setItem("token", tkn);
    localStorage.setItem("user", userData);
  }

  function handleTokenRemone() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);
  const ctxVal = {
    token,
    user,
    handleTokenAdd,
    handleTokenRemone,
  };
  return <AuthContext.Provider value={ctxVal}>{children}</AuthContext.Provider>;
}
