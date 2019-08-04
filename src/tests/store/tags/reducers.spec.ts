import { setTags, addTag, updateTag, deleteTag } from "store/tags/actions";
import { Tag } from "store/tags/types";
import reducer from "store/tags/reducer";
import TagModel from "models/tag";

const tags = ["tag1", "tag2"].reduce((acc, t) => {
  const tag = TagModel(t);
  return Object.assign(acc, { [tag.id]: tag });
}, {});

const tag = TagModel("tag3");
const fakeTag = TagModel("fake");
describe("tags reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, setTags({}))).toEqual({});
  });

  it("should handle SET_TAGS", () => {
    expect(reducer({}, setTags(tags))).toEqual(tags);

    expect(
      reducer(
        {
          [tag.id]: tag
        },
        setTags(tags)
      )
    ).toEqual(tags);
  });

  it("should handle ADD_TAG", () => {
    expect(reducer({}, addTag(tag))).toEqual({ [tag.id]: tag });

    expect(reducer(tags, addTag(tag))).toEqual(
      Object.assign(tags, { [tag.id]: tag })
    );
  });

  describe("should handle UPDATE_TAG", () => {
    const name = "updated name";
    const tagUpdate = {
      tag,
      values: { name }
    };
    const updatedTag: Tag = Object.assign({}, tag, { name });
    const updateTagState = {
      [updatedTag.id]: updatedTag
    };
    const initialState = reducer(tags, addTag(tag));

    afterEach(() => {
      // make sure that initial tag is not updated
      expect(tag.name).toBe("tag3");
      expect(initialState[tag.id].name).toBe("tag3");
    });

    it("when state is empty", () => {
      expect(reducer({}, updateTag(tagUpdate))).toEqual(updateTagState);
    });

    it("when tag is present", () => {
      const updatedState = reducer(initialState, updateTag(tagUpdate));
      expect(updatedState).toEqual(
        Object.assign({}, initialState, updateTagState)
      );
      expect(updatedState[updatedTag.id].name).toEqual(name);
    });

    it("when tag is missing", () => {
      const tagUpdateFake = {
        tag: fakeTag,
        values: { name }
      };

      const updatedTagFake: Tag = Object.assign({}, fakeTag, { name });

      expect(reducer(initialState, updateTag(tagUpdateFake))).toEqual(
        Object.assign({}, initialState, {
          [fakeTag.id]: updatedTagFake
        })
      );
    });
  });

  it("should handle DELETE_TAG", () => {
    const tagState = {
      [tag.id]: tag
    };

    expect(reducer(tagState, deleteTag(tag))).toEqual({});
    expect(reducer(tagState, deleteTag(fakeTag))).toEqual(tagState);
  });
});
