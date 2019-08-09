import "@testing-library/react/cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";

const getContentState = (text = "test") => ({
  entityMap: {},
  blocks: [
    {
      key: "9dfaj",
      text,
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: []
    }
  ]
});

global.getContentState = getContentState;
