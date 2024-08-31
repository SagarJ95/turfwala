import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  swith,
} from "react-router-dom";
import Home from "./components/layout/Home";
import TurfDetails from "./components/layout/turf_details";
import "./App.css";

const App = () => (
  <Router>
    <Fragment>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/turf_details" Component={TurfDetails} />
      </Routes>
    </Fragment>
  </Router>
);

export default App;
