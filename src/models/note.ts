import uuidv4 from "uuid/v4";

const NoteModel = function(body: string, tags: Array<string> = []) {
  return {
    id: uuidv4(),
    body,
    tags,
    created_at: Date.now()
  };
};

export default NoteModel;
