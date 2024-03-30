import { Link } from "react-router-dom"
import "../css/Nav.css"

const Nav = (props) => {
    console.log(props.isLoggedIn)

    const navbarStyle = {
        backgroundColor: "mediumpurple", 
        color: "white", 
        marginBottom: "10px",
    };


    const loggedInLink = (
        <div>
            <Link to="/logout">Logout</Link>
            <Link to="/">Home</Link>
        </div>
    )

    // const noAuthLinks = (
    //     <div>
    //         <Link to="/homepage">Home</Link>
    //     </div>
    // )

    return (
        <nav id="main-nav" className="navbar">
            <div>
                <Link to="/" className="nav-button">Home</Link>
            </div>

            <div>
                {/* {props.isLoggedIn ? loggedInLink : noAuthLinks} */}
            </div>
            <div>
            <Link to="/Bmr" className="nav-button">BMR Calc</Link>
            </div>  
        </nav>
    )
}

export default Nav