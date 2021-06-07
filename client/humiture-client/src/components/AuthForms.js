import { useState, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
// import HCaptcha from "@hcaptcha/react-hcaptcha";
import ReCaptcha from "react-google-recaptcha";

import CardContainer from "./CardContainer";
import InputField from "./InputField";
import Button from "./Button";

import styles from "./AuthForms.module.css";

import {
  handleAppLogin,
  handleAppRegister,
  handleReCAPTCHAVerification,
} from "../api";
import { ACTION_TYPES } from "../reducers";
import { useAuthContext as useAPPAuthContext } from "../contexts";

function AuthForm({ path }) {
  const { auth } = useAPPAuthContext();

  if (auth.isAuthenticated) return <Redirect to="/dashboard" />;

  if (path === "login") return <AuthLoginForm />;
  else if (path === "register") return <AuthRegisterForm />;
  else return <></>;
}

function AuthLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ err: false, message: "" });
  const [loading, setLoading] = useState(false);

  const { dispatchAuth } = useAPPAuthContext();

  const reRef = useRef(null);

  const handleLogin = async (username, password) => {
    if (username === "" || password === "")
      setError({ err: true, message: "Fill the required fields!" });
    else {
      const token = await reRef.current.executeAsync();
      setLoading(true);
      reRef.current.reset();

      const { success } = await handleReCAPTCHAVerification(token);
      if (success) {
        let {
          user,
          error: _error,
          message,
        } = await handleAppLogin(username, password);

        if (_error) {
          setUsername("");
          setPassword("");
          setError({ err: true, message: "Invalid credentials!" });
          console.log(message);
          setLoading(false);
        } else dispatchAuth({ type: ACTION_TYPES.SET_USER, payload: user });
      } else {
        console.log("CAPTCHA not verified!");
        setError({ err: true, message: "CAPTCHA not verified!" });
        setLoading(false);
      }
    }
  };

  return (
    <CardContainer styles={[styles.auth]}>
      <form className={styles.authForm} onSubmit={(e) => e.preventDefault()}>
        <h2 className={styles.authFormHeader}>Login</h2>
        {error.err && <p className={styles.errorInfo}>{error.message}</p>}
        <InputField
          styles={[styles.usernameField]}
          type="text"
          // info="Required"
          // severity="warning"
          dtype="username"
          required={true}
          label="Username"
          value={username}
          title="Username"
          // pattern=".{5,}"
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
          pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$"
          title="Requires 6 characters (A-z, a-z, 0-9, and atleast one special character)"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className={styles.forgotPassword}>Forgot Password?</p>
        <div
          style={{
            position: "relative",
            textAlign: "center",
            margin: "1rem auto 0",
          }}
        >
          <ReCaptcha
            sitekey={"6LejbBsbAAAAAIaNkjeL9bdGRW0nWXPu3sZLiTcB"}
            size="invisible"
            ref={reRef}
          />
        </div>
        <Button
          styles={[styles.authButton]}
          onClick={() => handleLogin(username, password)}
          disabled={loading}
        >
          {loading ? "Authenticating..." : "Login"}
        </Button>
        <Link to="/register">
          <p className={styles.createAccount}>
            Haven’t registered? Create account
          </p>
        </Link>
      </form>
    </CardContainer>
  );
}

function AuthRegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState({ err: false, message: "" });
  const [loading, setLoading] = useState(false);

  const { dispatchAuth } = useAPPAuthContext();

  const reRef = useRef(null);

  const handleRegister = async (username, password, passwordConfirm) => {
    if (username === "" || password === "")
      setError({ err: true, message: "Fill the required fields!" });
    else if (password !== passwordConfirm)
      setError({ err: true, message: "Passwords should match!" });
    else {
      const token = await reRef.current.executeAsync();
      setLoading(true);
      reRef.current.reset();
      const { success } = await handleReCAPTCHAVerification(token);
      if (success) {
        setError({ err: false, message: "" });
        let {
          user,
          error: _error,
          message,
        } = await handleAppRegister(username, password, passwordConfirm);
        if (_error) {
          setUsername("");
          setPassword("");
          setPasswordConfirm("");
          setError({ err: true, message: message });
          console.log(message);
          setLoading(false);
        } else dispatchAuth({ type: ACTION_TYPES.SET_USER, payload: user });
      } else {
        console.log("CAPTCHA not verified!");
        setError({ err: true, message: "CAPTCHA not verified!" });
        setLoading(false);
      }
    }
  };

  return (
    <CardContainer styles={[styles.auth]}>
      <form className={styles.authForm} onSubmit={(e) => e.preventDefault()}>
        <h2 className={styles.authFormHeader}>Register</h2>
        {error && <p className={styles.errorInfo}>{error.message}</p>}
        <InputField
          styles={[styles.usernameField]}
          type="test"
          dtype="username"
          value={username}
          // info="Required"
          // severity="warning"
          required={true}
          label="Username"
          pattern=".{5,}"
          title="Requires atleast 5 characters"
          placeholder="Enter a username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          type="password"
          value={password}
          // info="Required"
          // severity="warning"
          placeholder="Enter a password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$"
          title="Requires atleast 6 characters (A-z, a-z, 0-9, and atleast one special character)"
        />
        <InputField
          type="password"
          value={passwordConfirm}
          // info="Required"
          // severity="warning"
          placeholder="Confirm password"
          required={true}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          label="Confirm password"
          pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$"
          title="Requires 6 characters (A-z, a-z, 0-9, and atleast one special character)"
        />
        <ReCaptcha
          sitekey={"6LejbBsbAAAAAIaNkjeL9bdGRW0nWXPu3sZLiTcB"}
          size="invisible"
          ref={reRef}
        />
        <Button
          styles={[styles.authButton]}
          type="submit"
          disabled={loading}
          onClick={() => handleRegister(username, password, passwordConfirm)}
        >
          {loading ? "Registering..." : "Register"}
        </Button>
        <Link to="/login">
          <p className={styles.createAccount}>Already registered? Login</p>
        </Link>
      </form>
    </CardContainer>
  );
}

export { AuthForm };
