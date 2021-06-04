import CardContainer from "./CardContainer";

import styles from "./SectionHeader.module.css";

function SectionHeader({ title }) {
  return (
    <CardContainer styles={[styles.sectionHeader]}>
      <h3>{title}</h3>
    </CardContainer>
  );
}

export default SectionHeader;
