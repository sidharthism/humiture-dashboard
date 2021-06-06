import { Redirect } from "react-router-dom";

import ReportSection from "./ReportSection";
import NotesSection from "./NotesSection";

// import { COLORS } from "../utils";

import styles from "./Dashboard.module.css";

import { useAPPAuthInit } from "../api";

function Dashboard() {
  // let [color, setColor] = useState(COLORS.blue);

  // const auth = useAPPAuthInit();
  // console.log(auth);

  // if (!auth.isAuthenticated) return <Redirect to="/login" />;

  return (
    <div className={styles.container}>
      <ReportSection />
      <NotesSection />
    </div>
  );
}

export default Dashboard;
