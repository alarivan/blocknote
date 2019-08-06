import React from "react";
import { Note } from "store/notes/types";

type NoteProps = {
  note: Note;
  onClick(): void;
};

const SimpleView = (props: NoteProps) => (
  <div onClick={() => props.onClick()}>{props.note.body}</div>
);

export default SimpleView;
