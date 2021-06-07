import { useEffect, useReducer, useState } from "react";
// import axios from "axios";

import { authReducer } from "../reducers";
import { ACTION_TYPES } from "../reducers";

import { AUTH_STATE as INITIAL_AUTH_STATE, useAuthContext } from "../contexts";

const useAPPAuthInit = () => {
  const [auth, dispatchAuth] = useReducer(authReducer, INITIAL_AUTH_STATE); // Initializing auth
  console.log(auth);

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

const handleAPPLogin = async (username, password) => {
  try {
    let res = await fetch("http://localhost:8000/auth/login/", {
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

export { useAPPAuthInit, handleAPPLogin };
