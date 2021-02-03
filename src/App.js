import React from "react";
// import { Counter } from './features/counter/Counter';
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./features/Home/Home";
import Dashboard from "./features/Dashboard/Dashboard";
import Signup from "./features/Signup/Signup";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route component={Dashboard} path="/dashboard" exact={true} />
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
