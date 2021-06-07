import { useState } from "react";

import SectionHeader from "./SectionHeader";
import { AddNote, SavedNote } from "./Note";

import styles from "./NotesSection.module.css";

import { useNotesData } from "../api";

function NotesSection() {
  const { noteList, handleAddNote, handleDeleteNote } = useNotesData();
  return (
    <div className={styles.notesContainer}>
      <SectionHeader title="Notes" />
      <div className={styles.notesWrap}>
        <AddNote required={true} onAdd={(n) => handleAddNote(n)} />
        <ol className={styles.notesList}>
          {noteList.length !== 0 &&
            noteList.map((note) => (
              <li key={note.id}>
                <SavedNote
                  value={note.content}
                  // id={note.id}
                  onDelete={() => handleDeleteNote(note.id)}
                />
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
}

export default NotesSection;
