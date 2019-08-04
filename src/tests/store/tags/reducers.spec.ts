import { setTags, addTag } from "store/tags/actions";
import reducer from "store/tags/reducer";
import TagModel from "models/tag";

const tags = ["tag1", "tag2"].map(t => TagModel(t));
const tag = TagModel("tag3");
describe("tags reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, setTags([]))).toEqual({
      tags: []
    });
  });

  it("should handle SET_TAGS", () => {
    expect(
      reducer(
        {
          tags: []
        },
        setTags(tags)
      )
    ).toEqual({
      tags
    });

    expect(
      reducer(
        {
          tags: [tag]
        },
        setTags(tags)
      )
    ).toEqual({
      tags
    });
  });

  it("should handle ADD_TAG", () => {
    expect(
      reducer(
        {
          tags: []
        },
        addTag(tag)
      )
    ).toEqual({
      tags: [tag]
    });

    expect(
      reducer(
        {
          tags
        },
        addTag(tag)
      )
    ).toEqual({
      tags: [...tags, tag]
    });
  });
});
