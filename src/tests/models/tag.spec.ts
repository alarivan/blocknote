import TagModel, { NAME_ERROR_MESSAGE } from "models/tag";

const tagName = "Test tag";
describe("TagModel", () => {
  it("creates tag", () => {
    const tag = TagModel(tagName);

    expect(tag.name).toEqual(tagName.toLowerCase());
    expect(typeof tag.color).toBe("string");
    expect(typeof tag.id).toBe("string");
  });

  it("throws an error when name is empty", () => {
    expect(() => TagModel("")).toThrowError(NAME_ERROR_MESSAGE);
  });

  it("creates tag with custom color", () => {
    const color = "#000000";
    const tag = TagModel(tagName, { color });

    expect(tag.color).toBe(color);
  });
});
