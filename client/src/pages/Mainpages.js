import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../components/Header/Header";
import Home from "./Home/Home";
import ServiceAdd from "./ServiceAdd/ServiceAdd";
import Archive from "./Archive/Archive";

const Mainpages = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/add" element={<ServiceAdd />} />
        <Route exact path="/archive" element={<Archive />} />
      </Routes>
    </Router>
  );
};

export default Mainpages;
