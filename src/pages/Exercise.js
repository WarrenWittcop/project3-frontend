import React, { useState, useEffect } from "react";
import "../css/Exercise.css";

const Exercise = ({ user }) => {
  const [exercises, setExercises] = useState([]);
  const [editedName, setEditedName] = useState("");
  const [editedDuration, setEditedDuration] = useState("");

  useEffect(() => {
    if (user) {
      fetchExercises();
    }
  }, [user]);

  const fetchExercises = async () => {
    try {
      const response = await fetch(`http://localhost:4000/user/${user.id}/exercise`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': localStorage.getItem("authToken")
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setExercises(data.exercises);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  const handleEdit = (exercise) => {
    setEditedName(exercise.name);
    setEditedDuration(exercise.duration);
  };

  const handleAddExercise = () => {
    if (editedName && editedDuration) {
      const newExercise = {
        id: Date.now(), // timestamp
        name: editedName,
        duration: editedDuration,
      };
      setExercises([...exercises, newExercise]);
      setEditedName("");
      setEditedDuration("");
    }
  };

  const handleSave = async () => {
    try {
      // Save exercises to the user's database
      const response = await fetch(`http://localhost:4000/user/${user.id}/exercise`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': localStorage.getItem("authToken")
        },
        body: JSON.stringify(exercises)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Exercises saved successfully to the database!");
    } catch (error) {
      console.error("Error saving exercises to the database:", error);
    }
  };

  return (
    <div className="exercise-page">
      <h2 className="exercise-head">Exercise</h2>
      <div className="exercise-form">
        <input
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          placeholder="Exercise name"
        />
        <input
          type="text"
          value={editedDuration}
          onChange={(e) => setEditedDuration(e.target.value)}
          placeholder="Duration"
        />
        <button onClick={handleAddExercise}>Add Exercise</button>
      </div>
      <div className="exercise-table">
        <table>
          <thead>
            <tr>
              <th>Exercise</th>
              <th>Minutes</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((exercise, index) => (
              <tr key={index}>
                <td>{exercise.name}</td>
                <td>{exercise.duration}</td>
                <td>
                  <button onClick={() => handleEdit(exercise)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleSave} className="save-button">Save</button>
      </div>
    </div>
  );
};

export default Exercise;