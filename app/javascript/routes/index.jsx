import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import NewExercise from "../components/NewExercise";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/exercise" element={<NewExercise />} />
    </Routes>
  </Router>
);
