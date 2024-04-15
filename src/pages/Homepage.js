import { Link } from "react-router-dom"

import "../css/Homepage.css"

const Homepage = () => {
    const URL = process.env.REACT_APP_URL
    return (
        <div>
            <h2>Welcome to</h2>
            <h1>LIVE VIGOR!</h1>
            <p>Login or sign up to continue!</p>
                <div className="links">
                    <Link to="/signup" className="button">Signup</Link>
                    <Link to="/login" className="button">Login</Link>
                </div>

        </div>

    )
}

export default Homepage