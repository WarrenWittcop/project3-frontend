import { Link } from "react-router-dom"

const Nav = (props) => {
    console.log(props.isLoggedIn)

    //user is logged in - show them only the logout
    const loggedInLink = (
        <div>
            <Link to="/logout">Logout</Link>
            <Link to="/">Home</Link>
        </div>
    )

    const noAuthLinks = (
        <div>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
        </div>
    )

    return (
        <nav className="navbar">
            <div>
                <Link to="/">Home</Link>
            </div>
            <div>
                {props.isLoggedIn ? loggedInLink : noAuthLinks}
            </div>
        </nav>
    )
}

export default Nav