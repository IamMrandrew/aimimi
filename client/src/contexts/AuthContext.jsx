import React, { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [auth, setAuth] = useState(null);
  const [propic, setPropic] = useState("");

  return (
    <AuthContext.Provider value={{ auth, setAuth, propic, setPropic }}>
      {props.children}
    </AuthContext.Provider>
  );
};
