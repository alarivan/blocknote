import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Home from "components/routes/Home";

const mockStore = configureMockStore();
const store = mockStore({ notesState: {}, tagsState: {} });

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <Home />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
