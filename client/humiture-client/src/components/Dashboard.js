import { Redirect } from "react-router-dom";

import ReportSection from "./ReportSection";
import NotesSection from "./NotesSection";

import styles from "./Dashboard.module.css";

import { useAuthContext } from "../contexts";

function Dashboard() {
  const { auth } = useAuthContext();

  if (!auth.isAuthenticated) return <Redirect to="/login" />;

  return (
    <div className={styles.container}>
      <ReportSection />
      <NotesSection />
    </div>
  );
}

export default Dashboard;
