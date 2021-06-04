import { useState } from "react";

import InputField from "./InputField";
import Button from "./Button";

import addIcon from "../assets/plus.svg";
import deleteIcon from "../assets/delete.svg";
import styles from "./Note.module.css";

function AddNote(props) {
  const [note, setNote] = useState("");
  const handleAdd = () => {
    props.onAdd(note);
    setNote("");
  };
  return (
    <div className={styles.noteContainer}>
      <InputField
        onChange={(e) => setNote(e.target.value)}
        value={note}
        required={props.required || false}
        styles={styles.noteFieldContainer}
        placeholder="Add note"
      />
      <Button
        disabled={note === ""}
        styles={[styles.addButton]}
        onClick={handleAdd}
      >
        <img src={addIcon} alt="Add" />
      </Button>
    </div>
  );
}

function SavedNote(props) {
  return (
    <div className={styles.savedNoteContainer}>
      <InputField
        onChange={props.onChange}
        value={props.value || ""}
        disabled
        styles={[
          styles.noteFieldContainer,
          styles.savedNoteFieldContainer,
        ].join(" ")}
      />
      <Button styles={[styles.deleteButton]} onClick={props.onDelete}>
        <img src={deleteIcon} alt="Delete" />
      </Button>
    </div>
  );
}

export { AddNote, SavedNote };
