import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Question from "./presentation/pages/Question";
import { HomePage } from "./presentation/pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/question" element={<Question />} />
      </Routes>
    </Router>
  );
}

export default App;
