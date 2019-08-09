import NoteModel from "models/note";

const noteBody = getContentState();
describe("NoteModel", () => {
  it("creates note", () => {
    const note = NoteModel(noteBody);

    expect(note.body).toBe(noteBody);
    expect(note.tags.length).toBe(0);
    expect(typeof note.created_at).toBe("number");
    expect(typeof note.id).toBe("string");
  });

  it("creates note with tags", () => {
    const note = NoteModel(noteBody, { tags: ["tag1", "tag2"] });

    expect(note.tags.length).toBe(2);
  });
});
