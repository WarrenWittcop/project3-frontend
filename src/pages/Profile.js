
// import { useEffect } from "react"
// import { useParams } from "react-router-dom"

// const Profile = ({user, fetchUser}) => {
//     const params = useParams()

//     useEffect(()=>{
//         // if the user refreshes the page this runs and fetches their data again
//         fetchUser(params.id)
//     }, [])
//     // yes we have the user data!
//     const userProfile = () =>{
//         return (
//             <div className="profile-heading">
//                 <h1>Welcome, {user.username}</h1>
//                 <h3>We've been waiting</h3>
//             </div>
//         )
//     }
//     // hmm no user data, let's check if they're logged in, too
//     const checkForUser = () => {
//         let token = localStorage.getItem("authToken")
//         // no user AND no token? not logged in
//         if (!user && !token){
//             return (
//                 <div style={{color: "white"}}>
//                     <h1>403 Forbidden</h1>
//                 </div>
//             )
//         // just no user data? might be loading!
//         } else if (!user){
//             return (
//                 <div style={{color: "white"}}>
//                     <h1>Loading...</h1>
//                 </div>
//             )
//         }
//     }
//     // do we have the user data object? 
//     return ( user ? userProfile() : checkForUser())
// }

// export default Profile