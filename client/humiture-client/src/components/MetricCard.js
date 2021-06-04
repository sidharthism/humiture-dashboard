import CardContainer from "./CardContainer";

import styles from "./MetricCard.module.css";

function MetricCard(props) {
  return (
    <CardContainer styles={[styles.metricCard]}>
      <div className={styles.metricHeaderContainer}>
        {/* <h2>{props.title || "Metric title"}</h2> */}
        <img
          dtype={props.dtype || ""}
          src={props.icon}
          alt={props.title || "Icon"}
        />
        <h1 dtype={props.dtype || ""}>
          {props.faceValue || "0"}
          {` ${props.unit || ""}`}
        </h1>
      </div>
      <div className={[styles.lineGraph, styles.chartContainer].join(" ")}>
        {props.children}
      </div>
    </CardContainer>
  );
}

export default MetricCard;
