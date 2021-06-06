import React, { createContext, useContext, useReducer } from "react";

const AUTH_STATUS = {
  LOGGED_OUT: "LOGGED_OUT",
  LOGGED_IN: "LOGGED_IN",
};

/**
 * @AUTH_STATE {username: "", status: (AUTH_STATUS), isAuthenticated: boolean}
 */

const AUTH_STATE = {
  username: "",
  status: "LOGGED_OUT",
  isAuthenticated: false,
};

const AuthContext = createContext(AUTH_STATE);

const AuthProvider = ({ reducer, initialState, children }) => (
  <AuthContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </AuthContext.Provider>
);

const useAuthContext = () => useContext(AuthContext);

export { AUTH_STATE, AUTH_STATUS, AuthProvider, useAuthContext };
