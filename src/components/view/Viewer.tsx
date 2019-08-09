import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AppState } from "store/reducer";
import { NotesState, Note } from "store/notes/types";
import { TagsState, Tag } from "store/tags/types";
import TagPanel from "components/tag/Panel";
import List from "components/note/List";
import NoteView from "components/note/View";
import Editor from "components/view/Editor";
import { deleteNote } from "store/notes/actions";
import { Dispatch } from "redux";

type ViewProps = {
  notesState: NotesState;
  tagsState: TagsState;
  notes: Note[];
  tags: Tag[];
  deleteNote: (note: Note) => void;
};

const mapStateToProps = ({ notesState, tagsState }: AppState) => ({
  notesState,
  tagsState,
  notes: Object.values(notesState),
  tags: Object.values(tagsState)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  deleteNote: (note: Note) => dispatch(deleteNote(note))
});

const getTagsFromNote = (notes: NotesState, tags: TagsState, id: string) =>
  notes[id].tags.map((t: string) => tags[t]);

const ConnectedViewer = ({
  notes,
  tags,
  notesState,
  tagsState,
  deleteNote
}: ViewProps) => {
  const [presenter, setPresenter] = useState("empty");
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [createdNoteId, setCreatedNoteId] = useState("");
  useEffect(() => {
    if (currentNote) setCurrentNote(notesState[currentNote.id]);

    if (createdNoteId) setCurrentNote(notesState[createdNoteId]);
  }, [notesState]);
  useEffect(() => {
    if (createdNoteId) setCreatedNoteId("");
  }, [currentNote]);

  const handleDeleteClick = (note: Note) => {
    setPresenter("empty");
    setCurrentNote(null);
    deleteNote(note);
  };
  const handleEditClick = (note: Note) => {
    setPresenter("edit");
    setCurrentNote(note);
  };
  const handleViewClick = (note: Note) => {
    setPresenter("view");
    setCurrentNote(note);
  };

  function Presenter() {
    if (currentNote && presenter === "view") {
      return (
        <div className="p-2">
          <NoteView
            note={currentNote}
            tags={getTagsFromNote(notesState, tagsState, currentNote.id)}
          />
        </div>
      );
    } else if (presenter === "edit") {
      const noteTags = currentNote
        ? getTagsFromNote(notesState, tagsState, currentNote.id)
        : [];
      return (
        <Editor
          tags={tags}
          noteTags={noteTags}
          note={currentNote}
          onAddNote={note => {
            setCreatedNoteId(note.id);
            setPresenter("edit");
          }}
        />
      );
    } else {
      return <div></div>;
    }
  }

  return (
    <div className="flex">
      <div className="flex w-1/2">
        <div className="1/4">
          <TagPanel tags={tags} />
        </div>
        <div className="flex-1">
          <div className="px-2">
            <button
              className="w-full p-2 text-white font-bold bg-teal-400 hover:bg-teal-500"
              onClick={() => {
                setPresenter("edit");
                setCurrentNote(null);
              }}
            >
              new note
            </button>
          </div>
          <List
            notes={notes}
            onDeleteClick={note => handleDeleteClick(note)}
            onEditClick={note => handleEditClick(note)}
            onViewClick={note => handleViewClick(note)}
          />
        </div>
      </div>
      <div className="present w-1/2">
        <Presenter />
      </div>
    </div>
  );
};

const Viewer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedViewer);

export default Viewer;
