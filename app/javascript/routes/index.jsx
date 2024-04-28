import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import NewExercise from "../components/NewExercise";
import Exercises from "../components/Exercises";
import Exercise from "../components/Exercise";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/exercise" element={<NewExercise />} />
      <Route path="/exercises" element={<Exercises />} />
      <Route path="/exercises/:id" element={<Exercise />} />
    </Routes>
  </Router>
);
