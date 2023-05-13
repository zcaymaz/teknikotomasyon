import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../components/Home/Home";

const Mainpages = () => {
  return (
    <Router>
      <>
        <Route path="/" exact component={Home}></Route>
      </>
    </Router>
  );
};

export default Mainpages;
