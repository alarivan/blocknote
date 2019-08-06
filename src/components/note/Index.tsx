import React, { Dispatch, useState } from "react";
import { connect } from "react-redux";
import { Note, NotesActionTypes } from "store/notes/types";
import { addNote, updateNote, deleteNote } from "store/notes/actions";
import NoteModel from "models/note";
import List from "components/note/List";
import Form from "components/note/Form";

const mapDispatchToProps = (dispatch: Dispatch<NotesActionTypes>) => ({
  addNote: (body: string) => dispatch(addNote(NoteModel(body))),

  updateNote: (note: Note, body: string) =>
    dispatch(updateNote({ note, values: { body } })),

  deleteNote: (note: Note) => dispatch(deleteNote(note))
});

type IndexProps = {
  notes: Note[];
  addNote: (body: string) => void;
  updateNote: (note: Note, body: string) => void;
  deleteNote(note: Note): void;
};

export const ConnectedView = (props: IndexProps) => {
  const [formValue, setFormValue] = useState("");
  const [editedNote, setEditedNote] = useState<Note | null>(null);

  const handleDeleteClick = (note: Note) => props.deleteNote(note);
  const handleEditClick = (note: Note) => {
    setEditedNote(note);
    setFormValue(note.body);
  };

  const handleSubmit = (body: string) => {
    if (editedNote) {
      props.updateNote(editedNote, body);
      setEditedNote(null);
    } else {
      props.addNote(body);
    }
  };

  return (
    <>
      <List
        notes={props.notes}
        onDeleteClick={note => handleDeleteClick(note)}
        onEditClick={note => handleEditClick(note)}
      />
      <Form value={formValue} onSubmit={body => handleSubmit(body)} />
    </>
  );
};

const View = connect(
  null,
  mapDispatchToProps
)(ConnectedView);

export default View;
