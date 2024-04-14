import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import "../css/Exercise.css";

const Exercise = ({ user }) => {
  // const { id } = useParams();
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
      const response = await fetch(`http://localhost:4000/user/${user._id}`, {
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
      console.log(data)
      setExercises(data.data.exercise);
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
      // setEditedName("");
      // setEditedDuration("");
    }
  };

  const handleSave = async () => {

    try {
      // Save exercises to the user's database
      const response = await fetch(`http://localhost:4000/exercise/${user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem("authToken")}`
        },
        body: JSON.stringify({name: editedName, duration: editedDuration})
      });
      console.log(exercises)

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setEditedName("");
      setEditedDuration("");
      
      console.log("Exercises saved successfully to the database!");
    } catch (error) {
      console.error("Error saving exercises to the database:", error);
    }

    if (!user) {
      console.error("User is null");
      return;
    }
    console.log(user)
  };

  const handleDelete = (index) => {
    const updatedExercises = [...exercises];
    updatedExercises.splice(index, 1);

    // const response = fetch(`http://localhost:4000/exercise/${user._id}`, {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'authorization': `Bearer ${localStorage.getItem("authToken")}`
    //   },
    //   body: JSON.stringify({name: editedName, duration: editedDuration})
    // })

    // if (!response.ok) {
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }

    setExercises(updatedExercises);
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
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((exercise, index) => (
              <tr key={index}>
                <td>{exercise?.name}</td>
                <td>{exercise?.duration}</td>
                <td>
                  <button onClick={() => handleEdit(exercise)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(index)}>Delete</button>
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