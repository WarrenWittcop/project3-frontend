import { BrowserRouter } from 'react-router-dom';
import {Routes, Route, useNavigate} from 'react-router-dom'
import Profile from './pages/Profile';
import Signup from './components/Signup';
import Login from './components/Login';
import Nav from './components/Nav';
import Homepage from './pages/Homepage';
import './css/App.css';
import { useState, useEffect } from 'react';

function App() {

  // const [user, setUser] = useState(null)
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const navigate = useNavigate()
  // const URL = "http://localhost:4000/api/"
  
  // const handleSignUp = async(user) => {
  //   console.log
  //     const response = await fetch(URL + "auth/signup", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(user) 
  //     })
  //     const data = await response.json()
  //     console.log(data)
  //     navigate("/login")
  //   }
  

  //   useEffect(()=>{
  //     let token = localStorage.getItem("authToken")
  //     if(!token) {
  //       setIsLoggedIn(false) 
  //     } else {
  //       setIsLoggedIn(true) 
  //     }
  //   }, [])

  //   const handleLogin = async (user) => {
  //     const response = await fetch(URL + "auth/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(user)
  //     })
  //     const data = await response.json()
  //     if(response.status !== 200){
  //       return data
  //     }
  //     localStorage.setItem("authToken", data.token)
  //     setIsLoggedIn(true)
  //     // change from "/" to "/profile/:id" route
  //     navigate(`/profile/${data.id}`)
  //   }
         
  
  //       const handleSubmit = async (e) => {
  //               e.preventDefault()
  //               let submission = await props.handleLogin(form)

  //               if(submission) {
  //                   setErrorMsg(submission.error)
  //               }
  //           }

  //           const handleLogout = () => {
  //             console.log("in handle log")
  //             localStorage.removeItem("authToken")
  //             setIsLoggedIn(false)
  //             navigate("/")
  //           }

  //           const fetchUser = async (id) => {
  //             // grab the token from local storage
  //             const token = localStorage.getItem("authToken")
  //             if (token) {
  //               const response = await fetch(URL + `user/${id}`, {
  //                 method: "GET",
  //                 headers: {
  //                   "Content-Type": "application/json",
  //                   "authorization": token // remember that bearerHeader variable on the backend? req.headers['authorization']
  //                 }
  //               })
  //               const data = await response.json()
  //             //   console.log(data) //check for the data returned!
  //               setUser(data.data)
  //             } else {
  //               console.log("no token")
  //             }
  //           }

  return (
    <div className="App">
      <Nav />
      {/* <Nav isLoggedIn={isLoggedIn} handleLogout={handleLogout}/> */}
      <Routes>
        <Route path='/' element={<Homepage />}/>
        <Route path='/login' element={<Login/>}/>
        {/* <Route path='/login' element={<Login handleLogin={handleLogin}/>}/> */}
        {/* <Route path='/profile/:id' element={<Profile  fetchUser={fetchUser} user={user}/>}/> */}
        <Route path='/signup' element={<Signup/>}/>
        {/* <Route path='/signup' element={<Signup handleSignUp={handleSignUp}/>}/> */}
      </Routes>
    </div>
  );
  }  


export default App;
