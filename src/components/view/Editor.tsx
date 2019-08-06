import React, { Dispatch } from "react";
import { connect } from "react-redux";
import { Note, NotesActionTypes } from "store/notes/types";
import { updateNote } from "store/notes/actions";
import { Tag, TagsActionTypes } from "store/tags/types";
import { addTag } from "store/tags/actions";
import TagModel from "models/tag";

import NoteForm from "components/note/Form";
import TagForm from "components/tag/Form";
import TagList from "components/tag/List";

type NoteValues = {
  body?: string;
  tags?: string[];
};

type EditorProps = {
  note: Note;
  noteTags: Tag[];
  notes: any;
  tags: any;
  updateNote: (note: Note, values: NoteValues) => void;
  addTag: (name: string) => Tag;
};

const mapDispatchToProps = (
  dispatch: Dispatch<NotesActionTypes | TagsActionTypes>
) => ({
  updateNote: (note: Note, values: NoteValues) =>
    dispatch(updateNote({ note, values })),
  addTag: (name: string) => {
    const tag = TagModel(name);
    dispatch(addTag(tag));
    return tag;
  }
});

const Editor = (props: EditorProps) => {
  const handleSubmitNote = (body: string) =>
    props.updateNote(props.note, { body });
  const handleSubmitTag = (name: string) => {
    const tag = props.addTag(name);
    props.updateNote(props.note, { tags: [...props.note.tags, tag.id] });
  };

  return (
    <>
      <NoteForm
        value={props.note.body}
        onSubmit={body => handleSubmitNote(body)}
      />
      <hr />
      <TagForm value={""} onSubmit={name => handleSubmitTag(name)} />
      <TagList
        tags={props.noteTags}
        onDeleteClick={() => {}}
        onEditClick={() => {}}
      />
    </>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(Editor);
