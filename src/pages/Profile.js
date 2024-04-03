
import { useEffect } from "react"
import { useParams } from "react-router-dom"

const Profile = ({user, fetchUser}) => {
    const params = useParams()

    useEffect(()=>{
        
        fetchUser(params.id)
    }, [])
    
    const userProfile = () =>{
        return (
            <div className="profile-heading">
                <h1>Welcome, {user.username}</h1>
                <h3>We've been waiting</h3>
            </div>
        )
    }
   
    const checkForUser = () => {
        let token = localStorage.getItem("authToken")
       
        if (!user && !token){
            return (
                <div style={{color: "white"}}>
                    <h1>403 Forbidden</h1>
                </div>
            )
       
        } else if (!user){
            return (
                <div style={{color: "white"}}>
                    <h1>Loading...</h1>
                </div>
            )
        }
    }

    return ( user ? userProfile() : checkForUser())
}

export default Profile