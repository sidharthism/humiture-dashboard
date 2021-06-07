import logo from "../assets/logo.svg";
import avatar from "../assets/avatar.svg";
import styles from "./Navbar.module.css";

import { handleAppLogout } from "../api";
import { useAuthContext } from "../contexts";

function Navbar() {
  const {
    auth: { username, isAuthenticated },
    dispatchAuth,
  } = useAuthContext();

  const handleLogout = () => {
    handleAppLogout();
    dispatchAuth({ type: "RESET_USER" });
  };
  return (
    <div className={styles.navContainer}>
      <div className={styles.navbar}>
        <div
          className={[
            styles.branding,
            !isAuthenticated ? styles.notAuth : "",
          ].join(" ")}
        >
          <img src={logo} alt="logo" />
          <h2>{isAuthenticated ? "Humiture dashboard" : "Humiture"}</h2>
        </div>
        {isAuthenticated && (
          <>
            <div className={styles.userInfo}>
              <h4>{username}</h4>
              {/* <span className={styles.chevronDown}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span> */}
              <span className={styles.avatar}>
                <img src={avatar} alt="Avatar" />
              </span>
              <span className={styles.logoutWrap}>
                <button onClick={handleLogout}>Logout</button>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
