// Login and obtain token

import { useHistory } from "react-router-dom";

import { useEffect, useReducer, useState } from "react";
// import axios from "axios";

// import { authReducer } from "../reducers";
// import { ACTION_TYPES } from "../reducers";

import { AUTH_STATE as INITIAL_AUTH_STATE, useAuthContext } from "../contexts";

const useAPPAuthInit = () => {
  const [auth, setAuth] = useState(INITIAL_AUTH_STATE);
  console.log(auth);

  useEffect(() => {
    const _user = JSON.parse(localStorage.getItem("USER"));
    if (_user)
      setAuth({
        username: _user.username,
        token: _user.token,
        isAuthenticated: true,
        loading: false,
      });
    else setAuth({ ...INITIAL_AUTH_STATE, loading: false });
    // return [auth, setAuth];
  }, []);

  return [auth, setAuth];
};

const useHandleAPPLogin = (username, password, callback) => {
  //   const setAuth = useAuthContext()[1];
  fetch("http://localhost:8000/auth/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((_user) => {
      console.log(_user);

      localStorage.setItem(
        "USER",
        JSON.stringify({
          username: _user.username,
          token: _user.token,
        })
      );

      callback({
        username: _user.username,
        token: _user.token,
        isAuthenticated: true,
        loading: false,
      });
    })
    .catch((err) => console.error(err));

  callback({ ...INITIAL_AUTH_STATE, loading: false });
};

export { useAPPAuthInit, useHandleAPPLogin };
