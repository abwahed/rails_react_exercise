import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Exercises = () => {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const url = "/api/v1/exercises/index";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setExercises(response))
      .catch((error) => console.log(error.message));
  }, []);

  const allExercises = exercises.map((exercise, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card mb-4">
        <img
          src={exercise.image}
          className="card-img-top"
          alt={`${exercise.name} image`}
        />
        <div className="card-body">
          <h5 className="card-title">{exercise.name}</h5>
          <Link to={`/exercises/${exercise.id}`} className="btn custom-button">
            View Exercise
          </Link>
        </div>
      </div>
    </div>
  ));
  const noExercise = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No exercise yet. Why not <Link to="/exercise">create one</Link>
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">Exercises for every occasion</h1>
          <p className="lead text-muted">
            We’ve pulled together our most popular recipes, our latest
            additions, and our editor’s picks, so there’s sure to be something
            tempting for you to try.
          </p>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="text-end mb-3">
            <Link to="/exercise" className="btn custom-button">
              Create New Exercise
            </Link>
          </div>
          <div className="row">
            {exercises.length > 0 ? allExercises : noExercise}
          </div>
          <Link to="/" className="btn btn-link">
            Home
          </Link>
        </main>
      </div>
    </>
  );
}

export default Exercises;
