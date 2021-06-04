import { useState } from "react";

import SectionHeader from "./SectionHeader";
import { AddNote, SavedNote } from "./Note";

import styles from "./NotesSection.module.css";

const NOTES = [
  { content: "This is a sample note" },
  { content: "This is a sample note" },
  { content: "This is a sample note" },
];

function NotesSection() {
  const [noteList, setNoteList] = useState(NOTES);
  return (
    <div className={styles.notesContainer}>
      <SectionHeader title="Notes" />
      <div className={styles.notesWrap}>
        <AddNote
          required={true}
          onAdd={(n) => setNoteList((prev) => [...prev, { content: n }])}
        />
        <ol className={styles.notesList}>
          {noteList.map((note, index) => (
            <li key={index}>
              <SavedNote value={note.content} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default NotesSection;
