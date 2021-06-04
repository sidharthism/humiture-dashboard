import { AuthLoginForm } from "./AuthForms";

import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <h1>
          Realtime humidity and <br />
          temperature monitoring
        </h1>
      </div>

      <div className={styles.authContainer}>
        <AuthLoginForm />
      </div>
    </div>
  );
}

export default Home;
