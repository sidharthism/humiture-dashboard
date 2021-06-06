import { AuthForm } from "./AuthForms";

import styles from "./Home.module.css";

function Home(props) {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <h1>
          Realtime humidity and <br />
          temperature monitoring
        </h1>
      </div>

      <div className={styles.authContainer}>
        <AuthForm path={props.path} handleAuth={props.handleAuth} />
      </div>
    </div>
  );
}

export default Home;
