import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/auth";
import Home from "./components/home";
import Search from "./components/search"; // Search 컴포넌트 추가

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} /> {/* Search 경로 추가 */}
      </Routes>
    </Router>
  );
};

export default App;
