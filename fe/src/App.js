import "./App.css";
import "antd/dist/antd.css";
import { Intro } from "./comps/Intro/Intro";
import { Layout } from "./comps/Layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
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
