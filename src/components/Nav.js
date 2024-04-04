import { Link } from "react-router-dom";
import "../css/Nav.css";

const Nav = (props) => {
    return (
      <nav id="main-nav" className="navbar">
        <div className="nav-left">
          <Link to="/" className="nav-button">
            Home
          </Link>
          <Link to="/Bmr" className="nav-button">
            BMR Calc
          </Link>
        </div>
        <div className="nav-right">
          {props.isLoggedIn ? (
            <>
              <Link to={`/profile/${props.userId}`} className="nav-button">
                Profile
              </Link>
              <Link to="/" onClick={props.handleLogout} className="nav-button">
                Logout
              </Link>
            </>
          ) : null}
        </div>
      </nav>
    );
  };

export default Nav;