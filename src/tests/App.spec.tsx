import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import App from "../components/App";

const mockStore = configureMockStore();
const store = mockStore({ notesState: {}, tagsState: {} });

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
