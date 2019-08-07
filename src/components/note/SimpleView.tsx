import React from "react";
import { Note } from "store/notes/types";

type NoteProps = {
  note: Note;
  onClick(): void;
};

const SimpleView = (props: NoteProps) => (
  <div data-cy="note-body" onClick={() => props.onClick()}>
    {props.note.body}
  </div>
);

export default SimpleView;
