

import React, { useState } from "react";

import "../css/Exercise.css"


const Exercise = () => {
    const [exercises, setExercises] = useState([]);
    const [newName, setNewName] = useState("");
    const [newDuration, setNewDuration] = useState("");
    const [editingExercise, setEditingExercise] = useState(null);
    const [editedName, setEditedName] = useState("");
    const [editedDuration, setEditedDuration] = useState("");

  const handleEdit = (exercise) => {
    setEditingExercise(exercise);
    setEditedName(exercise.name);
    setEditedDuration(exercise.duration);
  };

  const handleSave = () => {
    let updatedExercises = [...exercises];
    if (editingExercise) {
      updatedExercises = updatedExercises.map((exercise) =>
        exercise.id === editingExercise.id
          ? { ...exercise, name: editedName, duration: editedDuration }
          : exercise
      );
    } else {
      if (newName && newDuration) {
        const newExercise = {
          id: exercises.length + 1,
          name: newName,
          duration: newDuration,
        };
        updatedExercises.push(newExercise);
      }
    }
    setExercises(updatedExercises);
    setEditingExercise(null);
    setNewName("");
    setNewDuration("");
  };

  return (
    <div>
      <h2>Exercise</h2>
      <table>
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Duration</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => (
            <tr key={exercise.id}>
              <td>{exercise.name}</td>
              <td>{exercise.duration}</td>
              <td>
                <button onClick={() => handleEdit(exercise)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingExercise && (
        <div>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <input
            type="text"
            value={editedDuration}
            onChange={(e) => setEditedDuration(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
};

export default Exercise;