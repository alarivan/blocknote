import uuidv4 from "uuid/v4";

type NoteOptional = {
  tags?: string[];
};

const NoteModel = function(body: string, values: NoteOptional = {}) {
  return {
    id: uuidv4(),
    body,
    tags: values.tags ? values.tags : [],
    created_at: Date.now()
  };
};

export default NoteModel;
