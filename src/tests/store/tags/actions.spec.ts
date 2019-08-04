import * as actions from "store/tags/actions";
import * as types from "store/tags/types";
import TagModel from "models/tag";

describe("tags/actions", () => {
  it("should create an action to set tags", () => {
    const tag = TagModel("name");
    const payload = Object.assign({}, { [tag.id]: tag });
    const expectedAction = {
      type: types.SET_TAGS,
      payload
    };

    const expectedActionEmpty = Object.assign({}, expectedAction, {
      payload: {}
    });

    expect(actions.setTags(payload)).toEqual(expectedAction);

    expect(actions.setTags({})).toEqual(expectedActionEmpty);
  });

  it("should create an action to add tag", () => {
    const payload = TagModel("name");
    const expectedAction = {
      type: types.ADD_TAG,
      payload
    };

    expect(actions.addTag(payload)).toEqual(expectedAction);
  });

  it("should create an action to update tag", () => {
    const payload = {
      tag: TagModel("name"),
      values: { name: "tag1" }
    };
    const expectedAction = {
      type: types.UPDATE_TAG,
      payload
    };

    expect(actions.updateTag(payload)).toEqual(expectedAction);
  });

  it("should create an action to delete tag", () => {
    const payload = TagModel("name");
    const expectedAction = {
      type: types.DELETE_TAG,
      payload
    };

    expect(actions.deleteTag(payload)).toEqual(expectedAction);
  });
});
