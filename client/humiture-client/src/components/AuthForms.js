import { useState } from "react";

import { Redirect, useHistory } from "react-router-dom";

import CardContainer from "./CardContainer";
import InputField from "./InputField";
import Button from "./Button";

import styles from "./AuthForms.module.css";

import { useHandleAPPLogin } from "../api";
import { useAuthContext as useAPPAuthContext } from "../contexts";

function AuthForm({ path, handleAuth }) {
  const history = useHistory();

  const auth = history.location.state;

  if (auth) return <Redirect to="/dashboard" />;

  if (path === "login") return <AuthLoginForm handleAuth={handleAuth} />;
  else if (path === "register")
    return <AuthRegisterForm setAuth={handleAuth} />;
  else return <></>;
}

function AuthLoginForm({ handleAuth }) {
  const history = useHistory();

  const useHandleLogin = (u, p) => {
    console.log(u, p);
    useHandleAPPLogin(u, p, (_user) => {
      history.push({ pathname: "/dashboard", state: _user });
    });
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <CardContainer styles={[styles.auth]}>
      <form className={styles.authForm}>
        <h2 className={styles.authFormHeader}>Login</h2>
        {/* <p className={styles.errorInfo}>Invalid credentials!</p> */}
        <InputField
          styles={[styles.emailField]}
          type="text"
          // info="Required"
          // severity="warning"
          dtype="username"
          required={true}
          label="Username"
          value={username}
          title="Username"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          type="password"
          // info="Required"
          // severity="warning"
          placeholder="Enter your password"
          required={true}
          value={password}
          label="Password"
          // pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$"
          title="Requires 6 characters (A-z, a-z, 0-9, and atleast one special character)"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className={styles.forgotPassword}>Forgot Password?</p>
        <Button styles={[styles.authButton]} onClick={useHandleLogin}>
          Login
        </Button>
        <p className={styles.createAccount}>
          Haven’t registered? Create account
        </p>
      </form>
    </CardContainer>
  );
}

function AuthRegisterForm() {
  return (
    <CardContainer styles={[styles.auth]}>
      <form className={styles.authForm}>
        <h2 className={styles.authFormHeader}>Register</h2>
        <p className={styles.errorInfo}>Invalid credentials!</p>
        <InputField
          styles={[styles.emailField]}
          type="email"
          info="Required"
          severity="warning"
          required={true}
          label="E-mail"
          placeholder="Enter your e-mail"
          onChange={(e) => console.log(e.target.value)}
        />
        <InputField
          type="password"
          info="Required"
          severity="warning"
          placeholder="Enter your password"
          required={true}
          label="Password"
          pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$"
          title="Requires 6 characters (A-z, a-z, 0-9, and atleast one special character)"
        />
        <p className={styles.forgotPassword}>Forgot Password?</p>
        <Button styles={[styles.authButton]}>Login</Button>
        <p className={styles.createAccount}>Already registered? Login</p>
      </form>
    </CardContainer>
  );
}

export { AuthForm };
