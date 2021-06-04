import { useState } from "react";

import styles from "./InputField.module.css";

function InputField(props) {
  const [val, setVal] = useState("");
  //   const inpVal = useRef("");
  return (
    <div className={[styles.inputFieldContainer, props.styles].join(" ")}>
      <input
        className={styles.field}
        type={props.type || "text"}
        placeholder={props.placeholder || ""}
        required={props.required || false}
        pattern={props.pattern || undefined}
        value={props.value}
        title={props.title}
        disabled={props.disabled || false}
        onChange={(e) => {
          setVal(e.target.value);
          //   inpVal.current = e.target.value;
          if (props.onChange) props.onChange(e);
        }}
      />
      {props.label && (
        <span
          className={[styles.label, val !== "" ? styles.notEmpty : ""].join(
            " "
          )}
        >
          {props.label}
        </span>
      )}
      {props.info && (
        <span
          className={[
            styles.info,
            props.severity === "warning" ? styles.warning : "",
          ].join(" ")}
        >
          {props.info}
        </span>
      )}
    </div>
  );
}

export default InputField;
