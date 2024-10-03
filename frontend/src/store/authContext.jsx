import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  token: "",
  handleTokenAdd: () => {},
  handleTokenRemone: () => {},
});

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState("");
  function handleTokenAdd(tkn) {
    setToken(tkn);
    localStorage.setItem("token", tkn);
  }
  function handleTokenRemone() {
    setToken(null);
    localStorage.removeItem("token");
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);
  const ctxVal = {
    token,
    handleTokenAdd,
    handleTokenRemone,
  };
  return <AuthContext.Provider value={ctxVal}>{children}</AuthContext.Provider>;
}
