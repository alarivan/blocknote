import uuidv4 from "uuid/v4";
import { RawDraftContentState } from "react-draft-wysiwyg";

type NoteOptional = {
  tags?: string[];
};

const NoteModel = function(
  body: RawDraftContentState,
  values: NoteOptional = {}
) {
  return {
    id: uuidv4(),
    body,
    tags: values.tags ? values.tags : [],
    created_at: Date.now()
  };
};

export default NoteModel;
