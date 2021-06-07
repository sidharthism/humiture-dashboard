import { useEffect, useReducer } from "react";
// import axios from "axios";

import { authReducer, ACTION_TYPES } from "../reducers";
import { AUTH_STATE as INITIAL_AUTH_STATE } from "../contexts";

import { API_ROOT } from "./config";

const useAPPAuthInit = () => {
  const [auth, dispatchAuth] = useReducer(authReducer, INITIAL_AUTH_STATE); // Initializing auth
  // console.log(auth);
  useEffect(() => {
    const _user = JSON.parse(localStorage.getItem("USER"));
    if (_user)
      dispatchAuth({
        type: ACTION_TYPES.SET_USER,
        payload: {
          username: _user.username,
          token: _user.token,
          isAuthenticated: true,
          loading: false,
        },
      });
    else dispatchAuth({ type: ACTION_TYPES.NO_USER });
  }, []);

  return { auth, dispatchAuth };
};

// Login and obtain token

const handleAppLogin = async (username, password) => {
  try {
    let res = await fetch(`${API_ROOT}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (res.status !== 200) {
      throw new Error(res.statusText);
    } else {
      let _user = await res.json();

      localStorage.setItem(
        "USER",
        JSON.stringify({
          username: username,
          token: _user.token,
        })
      );

      return {
        user: {
          username: username,
          token: _user.token,
          isAuthenticated: true,
          loading: false,
        },
        error: false,
        message: "Login success",
      };
    }
  } catch (err) {
    console.log(err);
    return {
      ...INITIAL_AUTH_STATE,
      isAuthenticated: false,
      loading: false,
      error: true,
      message: err.message,
    };
  }
};

// Login and obtain token

const handleAppRegister = async (username, password, passwordConfirm) => {
  try {
    let res = await fetch(`${API_ROOT}/auth/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        passwordConfirm: passwordConfirm,
      }),
    });

    if (res.status !== 200) {
      throw new Error(res.statusText);
    } else {
      let _user = await res.json();
      if (_user.username instanceof Array) {
        throw new Error("User already exists!");
      } else {
        localStorage.setItem(
          "USER",
          JSON.stringify({
            username: _user.username,
            token: _user.token,
          })
        );

        return {
          user: {
            username: username,
            token: _user.token,
            isAuthenticated: true,
            loading: false,
          },
          error: false,
          message: "Login success",
        };
      }
    }
  } catch (err) {
    console.log(err);
    return {
      ...INITIAL_AUTH_STATE,
      isAuthenticated: false,
      loading: false,
      error: true,
      message: err.message,
    };
  }
};

const handleAppLogout = () => {
  localStorage.removeItem("USER");
};

export { useAPPAuthInit, handleAppLogin, handleAppRegister, handleAppLogout };
