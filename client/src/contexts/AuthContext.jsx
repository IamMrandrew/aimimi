import React, { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [auth, setAuth] = useState(null);
  const [propic, setPropic] = useState("");
  const [authLoading, setAuthLoading] = useState(true);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, propic, setPropic, authLoading, setAuthLoading }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
