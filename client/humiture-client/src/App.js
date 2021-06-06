import { useCallback, useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";

import "./App.css";
import { AUTH_STATE as INITIAL_AUTH_STATE, AuthProvider } from "./contexts";

import { useAPPAuthInit } from "./api";

function App() {
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

  const handleAuth = useCallback((_user) => setAuth(_user), []);

  if (auth.loading) return <></>;

  return (
    <div className="App">
      <AuthProvider value={auth}>
        <Router>
          <Navbar handleAuth={handleAuth} />
          <Switch>
            <Route path="/login">
              <Home path={"login"} handleAuth={handleAuth} />
            </Route>
            <Route path="/register">
              <Home path="register" handleAuth={handleAuth} />
            </Route>
            <Route path="/dashboard" handleAuth={handleAuth}>
              <Dashboard />
            </Route>
            <Redirect exact path="/" to="/login" />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
