import styles from "./CardContainer.module.css";

function CardContainer(props) {
  return (
    <div className={[styles.card, ...props.styles].join(" ")}>
      {props.children}
    </div>
  );
}

export default CardContainer;
