import React from "react";
import { Note } from "store/notes/types";
import { Tag } from "store/tags/types";
import TagSimpleView from "components/tag/SimpleView";
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw } from "draft-js";

type NoteProps = {
  note: Note;
  tags: Tag[];
};

const View = (props: NoteProps) => (
  <div className="note-view">
    <div className="mb-2 w-full">
      {props.tags.map(tag => (
        <TagSimpleView
          showNumber={false}
          key={tag.id}
          tag={tag}
          onClick={() => {}}
        />
      ))}
    </div>
    <div
      data-cy="note-body"
      onClick={() => {}}
      dangerouslySetInnerHTML={{
        __html: stateToHTML(convertFromRaw(props.note.body))
      }}
    ></div>
  </div>
);

export default View;
