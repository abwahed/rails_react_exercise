import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Exercise = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [exercise, setExercise] = useState({trainings: ''});

  useEffect(() => {
    const url = `/api/v1/show/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setExercise(res))
      .catch((error) => navigate('/exercises'));
  }, [params.id]);

  const addHtmlEntities = (str) => {
    return String(str).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  };

  const deleteExercise = () => {
    const url = `/api/v1/destroy/${params.id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => navigate("/exercises"))
      .catch((error) => console.log(error.message));
  };

  const trainingList = () => {
    let trainingList = 'No trainings available';
    if (exercise.trainings.length > 0) {
      trainingList = exercise.trainings
        .split(',')
        .map((training, index) => (
          <li key={index} className='list-group-item'>{training}</li>
        ));
    }

    return trainingList;
  }

  const exerciseInstruction = addHtmlEntities(exercise.instruction);

  return (
    <div className="">
      <div className="hero position-relative d-flex align-items-center justify-content-center">
        <img
          src={exercise.image}
          alt={`${exercise.name} image`}
          className="img-fluid position-absolute"
        />
        <div className="overlay bg-dark position-absolute" />
        <h1 className="display-4 position-relative text-white">
          {exercise.name}
        </h1>
      </div>
      <div className="container py-5">
        <div className="row">
          <div className="col-sm-12 col-lg-3">
            <ul className="list-group">
              <h5 className="mb-2">Trainings</h5>
              {trainingList()}
            </ul>
          </div>
          <div className="col-sm-12 col-lg-7">
            <h5 className="mb-2">Exercise Instructions</h5>
            <div
              dangerouslySetInnerHTML={{
                __html: `${exerciseInstruction}`,
              }}
            />
          </div>
          <div className="col-sm-12 col-lg-2">
            <button
              type="button"
              className="btn btn-danger"
              onClick={deleteExercise}
            >
              Delete Exercise
            </button>
          </div>
        </div>
        <Link to="/exercises" className="btn btn-link">
          Back to exercises
        </Link>
      </div>
    </div>
  );
}

export default Exercise;
