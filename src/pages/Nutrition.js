
import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import "../css/Nutrition.css";

const Nutrition = ({ user, updateUserProfile, fetchUser }) => {
  const { id } = useParams();
  const [nutritionData, setNutritionData] = useState([]);
  const [food, setFood] = useState("");
  const [calories, setCalories] = useState("");
  const [totalCalories, setTotalCalories] = useState(0);




  const handleAddFood = () => {
    const newItem = { food, calories, totalCalories: 0};
    setNutritionData([...nutritionData, newItem]);
    setTotalCalories(totalCalories + Number(calories));
    setFood("");
    setCalories("");
  };

  const handleSave = async (e) => {
    if (!user) {
      console.error("User is null");
      return;
    }
  
    await fetchUser(id);
    
  
    // Append new nutrition data to the user's profile
    const updatedUserProfile = {
      ...user,
      nutrition: [...user.nutrition, ...nutritionData],
      totalCalories: user.totalCalories + totalCalories,
    };
  
    // Update user profile
    updateUserProfile(user.id, updatedUserProfile);
  };

  return (
    <div className="nutrition-page">
      <div className="nut-head"> 
      <h2>Nutrition Page</h2>
      </div>  
      <div className="nutrition-form">
        <input
          type="text"
          placeholder="Food"
          value={food}
          onChange={(e) => setFood(e.target.value)}
        />
        <input
          type="number"
          placeholder="Calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
        <button onClick={handleAddFood}>Add Food</button>
      </div>
      <div className="nutrition-table">
        <table>
          <thead>
            <tr>
              <th>Food</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody>
            {nutritionData.map((item, index) => (
              <tr key={index}>
                <td>{item.food}</td>
                <td>{item.calories}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total-calories">Total Calories: {totalCalories}</div>
      </div>
      <div className="button-container">
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default Nutrition;