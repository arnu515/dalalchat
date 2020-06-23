import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Join from "./Join";
import Chat from "./Chat";

export default () => (
  <Router>
    {/* <Switch> */}
    <Route path="/" exact component={Join}></Route>
    <Route path="/chat" component={Chat}></Route>
    {/* </Switch> */}
  </Router>
);
