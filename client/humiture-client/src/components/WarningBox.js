import { useEffect } from "react";

import styles from "./WarningBox.module.css";

function WarningBox({ metric, status, onClose }) {
  //   useEffect(() => {
  //     const onCloseTimeout = setTimeout(onClose, 5000);
  //     return () => {
  //       clearTimeout(onCloseTimeout);
  //     };
  //   });
  return (
    <div className={styles.warningBox}>
      <h4>
        {metric} is {status.toLowerCase()} !
      </h4>
      <button onClick={onClose}>Dismiss</button>
    </div>
  );
}

export default WarningBox;
