import React, { useState, useEffect } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor, RawDraftContentState } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

type NoteFormProps = {
  value: EditorState;
  onSubmit: (body: RawDraftContentState) => void;
};

function Form(props: NoteFormProps) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  useEffect(() => {
    setEditorState(props.value);
  }, [props.value]);

  const onEditorStateChange = (editorState: any) => {
    setEditorState(editorState);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const convertedData = convertToRaw(editorState.getCurrentContent());

    props.onSubmit(convertedData);
  };

  return (
    <div>
      <Editor
        editorClassName="border border-gray-200 mb-2 px-2"
        editorStyle={{ minHeight: "200px" }}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          options: [
            "inline",
            "blockType",
            "list",
            "emoji",
            "link",
            "remove",
            "history"
          ],
          inline: {
            options: ["bold", "italic", "underline", "strikethrough"]
          },
          list: {
            options: ["unordered", "ordered"]
          }
        }}
      />
      <button
        data-testid="note-form-submit"
        className="w-full p-2 text-white font-bold bg-teal-400 hover:bg-teal-500"
        onClick={handleSubmit}
      >
        save
      </button>
    </div>
  );
}

export default Form;
