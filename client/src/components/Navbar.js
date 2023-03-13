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
    <section className="section">
        <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                    <img src="https://thumbs.dreamstime.com/b/illustration-bowl-noodle-noodles-chopsticks-91574625.jpg" width="85" height="28"/>
            </div>
            <div className="navbar-menu">
                <div className="navbar-start">
                    <div className="navbar-item has-dropdown is-hoverable">
                        <p className="navbar-link">Username</p>
                        <div className="navbar-dropdown">
                            <NavLink className="navbar-item" to="/user">Profile</NavLink>
                        </div>
                    </div>
                    <NavLink className="navbar-item" to="/noods">Tasty Noods</NavLink>
                    <NavLink className="navbar-item" to="/pantry">My Pantry</NavLink>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                    <div className="navbar-item has-dropdown is-hoverable">
                        <p className="navbar-link">Admin</p>
                        <div className="navbar-dropdown">
                            <NavLink className="navbar-item">Comments</NavLink>
                            <NavLink className="navbar-item">Ratings</NavLink>
                            {/* <NavLink className="navbar-item">Nood</NavLink> */}
                        </div>
                    </div>
                        <button className="button is-danger" onClick={handleLogout}>
                            <strong>Logout</strong>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
        <div>
            <Outlet/>
        </div>
    </section>
    )
}
export default Navbar;