import { Routes, Route, useNavigate } from 'react-router-dom';
import Profile from './pages/Profile';
import Signup from './components/Signup';
import Login from './components/Login';
import Nav from './components/Nav';
import Bmr from "./components/Bmr";
import Homepage from './pages/Homepage';
import './css/App.css';
import { useState, useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const URL = "http://localhost:4000/";
  // const URL = process.env.URL

  
  useEffect(() => {
    let token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const updateUserProfile = async (userId, updatedUserData) => {
    try {
      const response = await fetch(`${URL}user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "authorization": localStorage.getItem("authToken")
        },
        body: JSON.stringify(updatedUserData)
      });
      const data = await response.json();
      console.log("User profile updated:", data);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };
  
  const handleSignUp = async (user) => {
    console.log
      const response = await fetch(URL + "auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user) 
      })
      const data = await response.json()
      console.log(data)
      navigate("/login")
    }
  

    useEffect(()=>{
      let token = localStorage.getItem("authToken")
      if(!token) {
        setIsLoggedIn(false) 
      } else {
        setIsLoggedIn(true) 
      }
    }, [])

    const handleLogin = async (user) => {
      const response = await fetch(URL + "auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      })
      const data = await response.json()
      if(response.status !== 200){
        return data
      }
      localStorage.setItem("authToken", data.token)
      setIsLoggedIn(true)
 
      navigate(`/user/${data.id}`)
    }
         
  
        // const handleSubmit = async (e) => {
        //         e.preventDefault()
        //         let submission = await props.handleLogin(form)

        //         if(submission) {
        //             setErrorMsg(submission.error)
        //         }
        //     }

            const handleLogout = () => {
              console.log("in handle log")
              localStorage.removeItem("authToken")
              setIsLoggedIn(false)
              navigate("/")
            }

             const fetchUser = async (id) => {
              // grab the token from local storage
              const token = localStorage.getItem("authToken")
              if (token) {
                const response = await fetch(URL + `user/${id}`, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    "authorization": token // remember that bearerHeader variable on the backend? req.headers['authorization']
                  }
                })
                const data = await response.json()
              //   console.log(data) //check for the data returned!
                setUser(data.data)
              } else {
                console.log("no token")
              }
            }

  return (
    <div className="App">
      <Nav isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login handleLogin={handleLogin} />} />
        <Route path='/user/:id' element={<Profile fetchUser={fetchUser} updateUserProfile={updateUserProfile} user={user} />} />
        <Route path='/signup' element={<Signup handleSignUp={handleSignUp} />} />
        <Route path='/Bmr' element={<Bmr />} />
      </Routes>
    </div>
  );
}

export default App;