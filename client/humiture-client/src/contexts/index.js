import React, { createContext, useContext, useReducer, useState } from "react";

// const AUTH_STATUS = {
//   LOGGED_OUT: "LOGGED_OUT",
//   LOGGED_IN: "LOGGED_IN",
// };

/**
 * @AUTH_STATE {username: "", token: (Token), isAuthenticated: boolean}
 */

const AUTH_STATE = {
  username: "",
  token: "",
  isAuthenticated: false,
  loading: false,
};

const AuthContext = createContext(AUTH_STATE);

const AuthProvider = ({ value, children }) => (
  <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
);

const useAuthContext = () => useContext(AuthContext);

export { AUTH_STATE, AuthProvider, useAuthContext };
