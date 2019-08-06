import React from "react";
import { connect } from "react-redux";
import { AppState } from "store/reducer";
import Editor from "components/view/Editor";
import { NotesState } from "store/notes/types";
import { TagsState } from "store/tags/types";

type ViewProps = {
  match: any;
  notes: NotesState;
  tags: TagsState;
};

const mapStateToProps = ({ notesState, tagsState }: AppState) => ({
  notes: notesState,
  tags: tagsState
});

const getTagsFromNote = (notes: NotesState, tags: TagsState, id: string) =>
  notes[id].tags.map((t: string) => tags[t]);

const ConnectedView = ({ match, notes, tags }: ViewProps) => {
  return (
    <>
      {match && notes[match.params.id] && (
        <div>
          <h2>View</h2>
          <Editor
            note={notes[match.params.id]}
            noteTags={getTagsFromNote(notes, tags, match.params.id)}
            notes={notes}
            tags={tags}
          />
        </div>
      )}
    </>
  );
};

const View = connect(mapStateToProps)(ConnectedView);

export default View;
