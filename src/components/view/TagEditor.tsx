import React, { Dispatch, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Note, NotesActionTypes } from "store/notes/types";
import { addTagToNote, deleteTagFromNote } from "store/notes/actions";
import { Tag, TagsActionTypes } from "store/tags/types";
import { addTag } from "store/tags/actions";
import TagModel from "models/tag";

import TagForm from "components/tag/Form";
import TagList from "components/tag/List";

type TagEditorProps = {
  note: Note | null;
  noteTags: Tag[];
  tags: Tag[];
  addTagToNote: (note: Note, tagId: string) => void;
  deleteTagFromNote: (note: Note, tagId: string) => void;
  addTag: (tag: Tag) => void;
};

const mapDispatchToProps = (
  dispatch: Dispatch<NotesActionTypes | TagsActionTypes>
) => ({
  addTagToNote: (note: Note, tagId: string) =>
    dispatch(addTagToNote(note, tagId)),

  deleteTagFromNote: (note: Note, tagId: string) =>
    dispatch(deleteTagFromNote(note, tagId)),

  addTag: (tag: Tag) => {
    dispatch(addTag(tag));
  }
});

const TagEditor = (props: TagEditorProps) => {
  const [filteredTags, setFilteredTags] = useState<Tag[]>([]);
  useEffect(() => {
    const filterTags = ((): Tag[] => {
      if (props.note && props.noteTags) {
        const tags = props.note.tags;
        return props.tags.filter(t => !tags.includes(t.id));
      }

      return props.tags;
    })();

    setFilteredTags(filterTags);
  }, [props.noteTags]);

  const handleSubmitTag = (name: string) => {
    if (props.note) props.addTag(TagModel(name, { notes: [props.note.id] }));
    else props.addTag(TagModel(name));
  };

  const handleTagClickAdd = (tag: Tag) => {
    if (props.note) props.addTagToNote(props.note, tag.id);
  };

  const handleTagClickDelete = (tag: Tag) => {
    if (props.note) props.deleteTagFromNote(props.note, tag.id);
  };

  return (
    <div>
      <TagForm value={""} onSubmit={name => handleSubmitTag(name)} />
      <>
        {props.noteTags && (
          <TagList
            tags={props.noteTags}
            onClick={tag => {
              handleTagClickDelete(tag);
            }}
          />
        )}
      </>
      <hr />
      <h1>Select Tags</h1>
      <TagList
        tags={filteredTags}
        onClick={(tag: Tag) => {
          handleTagClickAdd(tag);
        }}
      />
    </div>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(TagEditor);
