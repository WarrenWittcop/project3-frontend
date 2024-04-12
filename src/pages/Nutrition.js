
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import "../css/Nutrition.css";

const Nutrition = ({ user, updateUserProfile, fetchUser }) => {
  const { id } = useParams();
  const [nutritionData, setNutritionData] = useState([]);
  const [food, setFood] = useState("");
  const [calories, setCalories] = useState("");
  const [totalCalories, setTotalCalories] = useState(0);
  const [editedFood, setEditedFood] = useState("");
  const [editedCalories, setEditedCalories] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
      setNutritionData(user.nutrition);
      setTotalCalories(user.totalCalories);
  }, [user]);


  const handleAddFood = () => {
    const newItem = { food, calories, totalCalories: 0};
    setNutritionData([...nutritionData, newItem]);
    setTotalCalories(totalCalories + Number(calories));
    setFood("");
    setCalories("");
  };


  const handleEdit = (index) => {
    setEditedFood(nutritionData[index].food);
    setEditedCalories(nutritionData[index].calories);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedNutritionData = [...nutritionData];
    const deletedItem = updatedNutritionData.splice(index, 1);
    setNutritionData(updatedNutritionData);
    setTotalCalories(totalCalories - Number(deletedItem[0].calories));
  };

  const handleSave = async (e) => {
    if (!user) {
      console.error("User is null");
      return;
    }
  
    await fetchUser(id);
    
  
    // Add new nutrition data to the user's profile
    const updatedUserProfile = {
      ...user,
      nutrition: [...user.nutrition, ...nutritionData],
      totalCalories: user.totalCalories + totalCalories,
    };
  
    // Update user profile
    updateUserProfile(user.id, updatedUserProfile);
  };

  const handleUpdate = (index) => {
    const updatedNutritionData = [...nutritionData];
    updatedNutritionData[index] = { food: editedFood, calories: editedCalories };
    setNutritionData(updatedNutritionData);
    setEditIndex(null);
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
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {nutritionData.map((item, index) => (
              <tr key={index}>
                <td>{editIndex === index ? <input type="text" value={editedFood} onChange={(e) => setEditedFood(e.target.value)} /> : item.food}</td>
                <td>{editIndex === index ? <input type="number" value={editedCalories} onChange={(e) => setEditedCalories(e.target.value)} /> : item.calories}</td>
                <td>
                  {editIndex === index ? (
                    <button onClick={() => handleUpdate(index)}>Save</button>
                  ) : (
                    <button onClick={() => handleEdit(index)}>Edit</button>
                  )}
                </td>
                <td>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
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