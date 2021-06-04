import ReportSection from "./ReportSection";
import NotesSection from "./NotesSection";

// import { COLORS } from "../utils";

import styles from "./Dashboard.module.css";

function Dashboard() {
  // let [color, setColor] = useState(COLORS.blue);

  return (
    <div className={styles.container}>
      <ReportSection />
      <NotesSection />
    </div>
  );
}

export default Dashboard;
