import styles from "./Home.module.css";
import InputField from "./InputField";

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.innerDiv}>
        {/* <InputField
          type="email"
          required={true}
          label="E-mail"
          onChange={(e) => console.log(e.target.value)}
        /> */}
        {/* <InputField
          type="password"
          // info="Required"
          // severity="warning"
          required={true}
          label="Password"
          pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$"
          title="Requires 6 characters (A-z, a-z, 0-9, and atleast one special character)"
        /> */}
      </div>
    </div>
  );
}

export default Home;
