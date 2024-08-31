import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  swith,
} from "react-router-dom";
import Login from "./components/layout/login";
import Home from "./components/layout/Home";
import TurfDetails from "./components/layout/turf_details";
import userBooking from "./components/layout/user_booking";
import "./App.css";

const App = () => (
  <Router>
    <Fragment>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/login" Component={Login} />
        <Route exact path="/turf_details" Component={TurfDetails} />
        <Route exact path="/user_booking" Component={userBooking} />
      </Routes>
    </Fragment>
  </Router>
);

export default App;
