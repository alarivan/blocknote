import React, { Dispatch, useState } from "react";
import { connect } from "react-redux";
import { Tag, TagsActionTypes } from "store/tags/types";
import { addTag, updateTag, deleteTag } from "store/tags/actions";
import TagModel from "models/tag";
import List from "components/tag/List";
import Form from "components/tag/Form";

const mapDispatchToProps = (dispatch: Dispatch<TagsActionTypes>) => ({
  addTag: (name: string) => dispatch(addTag(TagModel(name))),

  updateTag: (tag: Tag, name: string) =>
    dispatch(updateTag({ tag, values: { name } })),

  deleteTag: (tag: Tag) => dispatch(deleteTag(tag))
});

type IndexProps = {
  tags: Tag[];
  addTag: (name: string) => void;
  updateTag: (tag: Tag, name: string) => void;
  deleteTag(tag: Tag): void;
};

export const ConnectedView = (props: IndexProps) => {
  const [formValue, setFormValue] = useState("");
  const [editedTag, setEditedTag] = useState<Tag | null>(null);

  const handleDeleteClick = (tag: Tag) => props.deleteTag(tag);
  const handleEditClick = (tag: Tag) => {
    setEditedTag(tag);
    setFormValue(tag.name);
  };

  const handleSubmit = (name: string) => {
    if (editedTag) {
      props.updateTag(editedTag, name);
      setEditedTag(null);
    } else {
      props.addTag(name);
    }
  };

  return (
    <>
      <List tags={props.tags} onClick={tag => {}} />

      <Form value={formValue} onSubmit={name => handleSubmit(name)} />
    </>
  );
};

const View = connect(
  null,
  mapDispatchToProps
)(ConnectedView);

export default View;
