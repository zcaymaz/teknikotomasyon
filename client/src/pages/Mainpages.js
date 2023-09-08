import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../components/Header/Header";
import Home from "./Home/Home";
import ServiceAdd from "./Services/ServiceAdd";
import ServiceUpdate from "./Services/ServiceUpdate";
import Archive from "./Archive/Archive";
import Footer from "../components/Footer/Footer";
import Test from "../pages/Test/Test";
import Login from "./Login/Login";

const isLogged = localStorage.getItem('name') ? true : false;

const Mainpages = () => {
  return (
    <Router>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header />
        <div style={{ flex: 1 }}>
          {isLogged ? (
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/add" element={<ServiceAdd />} />
              <Route exact path="/update/:id" element={<ServiceUpdate />} />
              <Route exact path="/archive" element={<Archive />} />
              <Route exact path="/test" element={<Test />} />
            </Routes>
          ) : (
            <Routes>
              <Route exact path="/login" element={<Login />} />
            </Routes>
          )}
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default Mainpages;
