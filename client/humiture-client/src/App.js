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

import { AuthProvider } from "./contexts";
import { useAPPAuthInit } from "./api";

function App() {
  const { auth, dispatchAuth } = useAPPAuthInit();

  if (auth.loading) return <></>; // Loading spinner

  return (
    <div className="App">
      <AuthProvider value={{ auth, dispatchAuth }}>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/login">
              <Home path={"login"} />
            </Route>
            <Route path="/register">
              <Home path="register" />
            </Route>
            <Route path="/dashboard">
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
