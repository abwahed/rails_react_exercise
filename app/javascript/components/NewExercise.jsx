import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NewExercise = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [trainings, setTrainings] = useState("");
  const [instruction, setInstruction] = useState("");

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const stripHtmlEntities = (str) => {
    return String(str)
      .replace(/\n/g, "<br> <br>")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/exercises/create";

    if (name.length == 0 || trainings.length == 0 || instruction.length == 0)
      return;

    const body = {
      name,
      trainings,
      instruction: stripHtmlEntities(instruction),
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => navigate(`/exercises/${response.id}`))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Add a new exercise to our exercise collection.
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="exerciseName">Exercise name</label>
              <input
                type="text"
                name="name"
                id="exerciseName"
                className="form-control"
                required
                onChange={(event) => onChange(event, setName)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exercisetraining">Trainings</label>
              <input
                type="text"
                name="trainings"
                id="exerciseTrainings"
                className="form-control"
                required
                onChange={(event) => onChange(event, setTrainings)}
              />
              <small id="trainingsHelp" className="form-text text-muted">
                Separate each training with a comma.
              </small>
            </div>
            <label htmlFor="instruction">Preparation Instructions</label>
            <textarea
              className="form-control"
              id="instruction"
              name="instruction"
              rows="5"
              required
              onChange={(event) => onChange(event, setInstruction)}
            />
            <button type="submit" className="btn custom-button mt-3">
              Create Exercise
            </button>
            <Link to="/exercises" className="btn btn-link mt-3">
              Back to exercises
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewExercise;
