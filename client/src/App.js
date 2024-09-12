import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginContainer from "./containers/LoginContainer";
import HomeContainer from "./containers/HomeContainer";
import TurfDetailsContainer from "./containers/TurfDetailsContainer";
import userBookingContainer from "./containers/userBookingContainer";
import "./App.css";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const App = () => (
  <Router>
    <Fragment>
      <Routes>
        <Route exact path="/" Component={HomeContainer} />
        <Route exact path="/login" Component={LoginContainer} />
        <Route exact path="/turf_details" Component={TurfDetailsContainer} />
        <Route exact path="/user_booking" Component={userBookingContainer} />
      </Routes>
    </Fragment>
  </Router>
);

export default App;
