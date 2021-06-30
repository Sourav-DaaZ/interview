import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DetailsPage from "./view/detailsPage";
import HomePage from "./view/homePage";

export default function App() {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/about" component={DetailsPage}/>
      </Switch>
    </Router>
  );
}
