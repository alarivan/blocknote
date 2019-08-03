import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "components/views/Home";
import Landing from "components/views/Landing";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/landing"}>Landing</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/landing" component={Landing} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
