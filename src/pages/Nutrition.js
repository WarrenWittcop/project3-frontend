
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import "../css/Nutrition.css";

const Nutrition = ({ user, updateUserProfile, fetchUser }) => {
  const { id } = useParams();
  const [nutritionData, setNutritionData] = useState([]);
  const [food, setFood] = useState("");
  const [calories, setCalories] = useState("");
  const [totalCalories, setTotalCalories] = useState(0);
  

  // useEffect(() => {
  //   if (user && user.id) {
  //     fetchUserNutritionData(user.id);
  //   }
  // }, [user, fetchUser]);
useEffect(() => {
  console.log(user.nutrition)
  setNutritionData(user.nutrition)
  // const fetchUserNutritionData = async () => {
  //   try {
  //     console.log("do you work")
  //     const token = localStorage.getItem("authToken");
  //     const response = await fetch(`http://localhost:4000/user/${id}/nutrition`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'authorization': `Bearer ${token}`
  //       }
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log(data.data)
  //     setNutritionData(data.nutrition);
  //   } catch (error) {
  //     console.error("Error fetching nutrition data:", error);
  //   }
  // }
  // // console.log(user.id)
  // if (localStorage.getItem("authToken")) {
  //   fetchUserNutritionData();
  // }
}, [user]);

  // handleAddFood function to add food to the nutritionData array
  const handleAddFood = () => {
    const newItem = { food, calories, totalCalories: 0};
    const updateNutritionData = [...nutritionData, newItem];

    localStorage.setItem("nutritionData", JSON.stringify(updateNutritionData));


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

    const localNutritionData = JSON.parse(localStorage.getItem("nutritionData"));    
  
    // Append new nutrition data to the user's profile
    const updatedUserProfile = {
      ...user,
      nutrition: [...user.nutrition, ...localNutritionData],
      totalCalories: user.totalCalories + totalCalories,
    };
  
    // Update user profile
    updateUserProfile(id, updatedUserProfile);

    console.log(nutritionData);

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