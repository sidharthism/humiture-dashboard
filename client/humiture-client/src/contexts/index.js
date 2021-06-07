import React, { createContext, useContext } from "react";

/**
 * @AUTH_STATE {username: "", token: (Token), isAuthenticated: boolean}
 */

const AUTH_STATE = {
  username: "",
  token: "",
  isAuthenticated: false,
  loading: false,
};

const AuthContext = createContext({ auth: AUTH_STATE, dispatchAuth: () => {} });

const AuthProvider = ({ value, children }) => (
  <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
);

const useAuthContext = () => useContext(AuthContext);

export { AUTH_STATE, AuthProvider, useAuthContext };
