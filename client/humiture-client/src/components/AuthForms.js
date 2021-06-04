import CardContainer from "./CardContainer";
import InputField from "./InputField";
import Button from "./Button";

import styles from "./AuthForms.module.css";

function AuthLoginForm() {
  return (
    <CardContainer styles={[styles.auth]}>
      <form className={styles.authForm}>
        <h2 className={styles.authFormHeader}>Login</h2>
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
        <p className={styles.createAccount}>
          Haven’t registered? Create account
        </p>
      </form>
    </CardContainer>
  );
}

export { AuthLoginForm };
