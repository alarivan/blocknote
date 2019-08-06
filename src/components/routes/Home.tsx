import React from "react";
import { connect } from "react-redux";
import { AppState } from "store/reducer";
import { Note } from "store/notes/types";
import { Tag } from "store/tags/types";
import NoteView from "components/note/Index";
import TagView from "components/tag/Index";

type Props = {
  match: any;
  notes: Note[];
  tags: Tag[];
};

const mapStateToProps = ({ notesState, tagsState }: AppState) => ({
  notes: Object.values(notesState),
  tags: Object.values(tagsState)
});

const Home = ({ notes, tags }: Props) => (
  <div>
    <h2>Home</h2>
    <NoteView notes={notes} />
    <hr />
    <TagView tags={tags} />
  </div>
);

export default connect(mapStateToProps)(Home);
