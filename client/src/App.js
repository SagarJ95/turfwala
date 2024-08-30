import React, { Fragment } from 'react';
import Home from './components/layout/Home';
import Banner from './components/layout/banner';
import Turf from './components/layout/turf';
import Top_Turf from './components/layout/top_turf';
import List_Turf from './components/layout/list_turf';
import './App.css';

const App = () =>
  <Fragment>
    <Home />
    <Banner />
    <Turf />
    <Top_Turf />
    <List_Turf />
  </Fragment>

export default App;
