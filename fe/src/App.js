import "./App.css";
import "antd/dist/antd.css";
import { Intro } from "./comps/Intro/Intro";
import { Layout } from "./comps/Layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useEffect } from "react";

const App = () => {
  // window.onbeforeunload = function () {
  //   localStorage.clear();
  // };

  return (
    <Router>
      <Routes>
        <Route path="/stepfunctions" element={<Layout />} />
        <Route path="/" element={<Intro />} />
      </Routes>
    </Router>
  );
};

export default App;
