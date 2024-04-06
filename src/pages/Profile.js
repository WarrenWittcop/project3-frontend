import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import "../css/Profile.css";

const URL = "http://localhost:4000";

const Profile = ({ user, fetchUser, handleSubmit }) => {
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [imageLink, setImageLink] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [sex, setSex] = useState('');
  const [goals, setGoals] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    fetchUser(params.id);
  }, []);

  useEffect(() => {

    if (user) {
      setImageLink(user.imageLink || '');
      setAge(user.age || '');
      setWeight(user.weight || '');
      setSex(user.sex || '');
      setGoals(user.goals || "");
      setBio(user.bio || "");
    }
  }, [user]);

  const handleSave = async (e) => {
    try {
      const updatedUserData = {
        imageLink: imageLink || "default_image_link.jpg",
        bio: bio,
        goals: goals,
        age: age,
        weight: weight,
        sex: sex
      };

      const response = await fetch(`${URL}/user/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "authorization": localStorage.getItem("authToken")
        },
        body: JSON.stringify(updatedUserData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);

      fetchUser(params.id)
      // await handleSubmit(e);

      setIsEditing(false);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'imageLink':
        setImageLink(value);
        break;
        case 'bio':
          setBio(value);
          break;
          case 'goals':
            setGoals(value);
            break;
      case 'age':
        setAge(value);
        break;
      case 'weight':
        setWeight(value);
        break;
      case 'sex':
        setSex(value);
        break;
      default:
        break;
    }
  };

  const userProfile = () => {
    return (
      <div className="profile-heading">
        <div className="user-info">
          <div>
            <img src={user.imageLink} alt="Profile" />
          </div>
          <div className="user-details">
           <div className="details">
            <p>Bio: {user.bio}</p>
            <p>Goals: {user.goals}</p>
            </div>  
            <p>Age: {user.age}</p>
            <p>Weight: {user.weight}</p>
            <p>Sex: {user.sex}</p>
          </div>
        </div>
        <button onClick={toggleEditing}>Edit</button>

        <div className="profile-links">
      <Link to="./Nutrition.js" className="page-links">Nutrition</Link>
      <Link to="./Exercise.js" className="page-links">Exercise</Link>
      </div>
      
      </div>
    );
  };

  const editProfile = () => {
    return ( 
      <div className="profile-heading">
        <div>
          <label>Image Link:</label>
          <input
            type="text"
            name="imageLink"
            value={imageLink}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Bio:</label>
          <input
          type="text"
          name="bio"
          value={bio}
          onChange={handleChange}
          />
        </div>
        <div>
        <label>Goals:</label>
          <input
          type="text"
          name="goals"
          value={goals}
          onChange={handleChange}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={age}
            onChange={handleChange}
            placeholder="Enter age"
          />
        </div>
        <div>
          <label>Weight:</label>
          <input
            type="number"
            name="weight"
            value={weight}
            onChange={handleChange}
            placeholder="Enter weight"
          />
          <select name="weightUnit" onChange={handleChange}>
            <option value="lbs">lbs</option>
            <option value="kgs">kgs</option>
          </select>
        </div>
        <div>
        <label>Sex:</label>
        <div>
          <label>
            <input
              type="checkbox"
              name="sex"
              value="Male"
              checked={sex === "Male"}
              onChange={handleChange}
            />
            Male
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="sex"
              value="Female"
              checked={sex === "Female"}
              onChange={handleChange}
            />
            Female
          </label>
        </div>
      </div>  
        <button onClick={handleSave}>Save</button>
        <button onClick={toggleEditing}>Cancel</button>
      </div>
    );
  };

  const checkForUser = () => {
    let token = localStorage.getItem("authToken");

    if (!user && !token) {
      return (
        <div style={{ color: "white" }}>
          <h1>403 Forbidden</h1>
        </div>
      );
    } else if (!user) {
      return (
        <div style={{ color: "white" }}>
          <h1>Loading...</h1>
        </div>
      );
    }
  };

  return user ? (isEditing ? editProfile() : userProfile()) : checkForUser();
};

export default Profile;