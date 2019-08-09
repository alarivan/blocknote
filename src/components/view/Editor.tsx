import React, { Dispatch, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Note, NotesActionTypes } from "store/notes/types";
import { addNote, updateNote } from "store/notes/actions";
import { Tag, TagsActionTypes } from "store/tags/types";
import NoteModel from "models/note";
import NoteFormEditor from "components/note/EditorForm";
import TagEditor from "components/view/TagEditor";
import { RawDraftContentState } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw } from "draft-js";

type NoteValues = {
  body?: RawDraftContentState;
  tags?: string[];
};

type EditorProps = {
  note: Note | null;
  noteTags: Tag[];
  tags: Tag[];
  addNote: (note: Note) => void;
  updateNote: (note: Note, values: NoteValues) => void;
  onAddNote: (note: Note) => void;
};

const mapDispatchToProps = (
  dispatch: Dispatch<NotesActionTypes | TagsActionTypes>
) => ({
  addNote: (note: Note) => dispatch(addNote(note)),

  updateNote: (note: Note, values: NoteValues) =>
    dispatch(updateNote({ note, values }))
});

const Editor = (props: EditorProps) => {
  const [body, setBody] = useState(EditorState.createEmpty());
  useEffect(() => {
    if (props.note) {
      setBody(EditorState.createWithContent(convertFromRaw(props.note.body)));
    }
  }, [props.note]);

  const handleSubmitNote = (body: RawDraftContentState) => {
    if (props.note) props.updateNote(props.note, { body });
    else {
      const note = NoteModel(body);
      props.addNote(note);
      props.onAddNote(note);
    }
  };

  return (
    <div className="px-2">
      <NoteFormEditor value={body} onSubmit={body => handleSubmitNote(body)} />
      <hr />
      <TagEditor
        note={props.note}
        noteTags={props.noteTags}
        tags={props.tags}
      />
    </div>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(Editor);
