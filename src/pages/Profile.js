import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Profile = ({ user, fetchUser }) => {
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [imageLink, setImageLink] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [sex, setSex] = useState('');

  useEffect(() => {
    fetchUser(params.id);
  }, []);

  const handleSave = async () => {
    try {
      const updatedUserData = {
        imageLink: imageLink || "default_image_link.jpg",
        age: age,
        weight: weight,
        sex: sex
      };

      const response = await fetch(`/user/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUserData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);
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
            <p>Age: {user.age}</p>
            <p>Weight: {user.weight}</p>
            <p>Sex: {user.sex}</p>
          </div>
        </div>
        <button onClick={toggleEditing}>Edit</button>
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
          <select name="sex" onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
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