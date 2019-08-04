import * as actions from "store/tags/actions";
import * as types from "store/tags/types";
import TagModel from "models/tag";

describe("tags/actions", () => {
  it("should create an action to set tags", () => {
    const payload = [TagModel("name")];
    const expectedAction = {
      type: types.SET_TAGS,
      payload
    };

    const expectedActionEmpty = Object.assign({}, expectedAction, {
      payload: []
    });

    expect(actions.setTags(payload)).toEqual(expectedAction);

    expect(actions.setTags([])).toEqual(expectedActionEmpty);
  });

  it("should create an action to add tag", () => {
    const payload = TagModel("name");
    const expectedAction = {
      type: types.ADD_TAG,
      payload
    };

    expect(actions.addTag(payload)).toEqual(expectedAction);
  });
});
