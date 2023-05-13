import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Mainpages from "./pages/Mainpages";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <>
      <Router>
        <>
          <Header />
          <Mainpages />
        </>
      </Router>
    </>
  );
};

export default App;
