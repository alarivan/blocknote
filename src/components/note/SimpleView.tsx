import React from "react";
import { Note } from "store/notes/types";
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw } from "draft-js";

type NoteProps = {
  note: Note;
};

const SimpleView = (props: NoteProps) => (
  <div
    className="px-2 pb-2"
    data-cy="note-body"
  >
    <div
      dangerouslySetInnerHTML={{
        __html: stateToHTML(convertFromRaw(props.note.body))
      }}
    ></div>
  </div>
);

export default SimpleView;
