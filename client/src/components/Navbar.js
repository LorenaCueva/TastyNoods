import { NavLink, Outlet } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext} from "react";
import { useNavigate } from "react-router-dom";


function Navbar(){

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    function handleLogout(){
        fetch('/logout', {
            method: "DELETE"
        })
        .then(setUser(null))
        .then(navigate('/'))
    }

    return(
    <div>
        <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                {/* <a className="navbar-item" href="https://bulma.io"> */}
                    <img src="https://i.pinimg.com/originals/89/76/e2/8976e2fc0f500e73604cb47df14327f5.jpg" width="112" height="28"/>
                {/* </a> */}
            </div>
            <div className="navbar-menu">
                <div className="navbar-start">
                    {/* <a className="navbar-item">My Pantry</a> */}
                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">{user.username}</a>
                        <div className="navbar-dropdown">
                            <NavLink className="navbar-item">Profile</NavLink>
                            <NavLink className="navbar-item">My Pantry</NavLink>
                        </div>
                    </div>
                    <NavLink className="navbar-item">Tasty Noods</NavLink>
                    <NavLink className="navbar-item" >My Pantry</NavLink>
                    <NavLink className="navbar-item" >Comments</NavLink>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <a className="button is-primary" onClick={handleLogout}>
                                <strong>Logout</strong>
                            </a>
                            {/* <a className="button is-light">Log in</a> */}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <div>
            <Outlet/>
        </div>
    </div>
    )
}
export default Navbar;