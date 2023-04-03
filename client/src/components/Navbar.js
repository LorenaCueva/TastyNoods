import { NavLink, Outlet } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

function Navbar(){

    const { user, setUser } = useContext(UserContext);
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!user){
            fetch('/me').then(response => {
                if(response.ok){
                    response.json().then(user => {
                        setUser(user);
                    })
                }
                else{
                    navigate('/');
                }
             })
            
        }
    // eslint-disable-next-line
    },[user])

    const toggleBurgerMenu = () => {
        setIsActive(!isActive);
    };

    function handleLogout(){
        fetch('/logout', {
            method: "DELETE"
        })
        .then(setUser(null))
        .then(navigate('/logout'))
    }

    if(user){
        return(
            <section className="section">
                <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                            <img src="https://thumbs.dreamstime.com/b/illustration-bowl-noodle-noodles-chopsticks-91574625.jpg" width="85" height="28" alt="logo"/>
                            <button className={`navbar-burger ${isActive ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false" onClick={toggleBurgerMenu}>
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                            </button>
                    </div>
                    <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
                        <div className="navbar-start">
                            <div className="navbar-item has-dropdown is-hoverable">
                                <p className="navbar-link" style={{ fontSize: "1.5rem" }}>{user.username}</p>
                                <div className="navbar-dropdown">
                                    <NavLink className="navbar-item" to="/user">Profile</NavLink>
                                </div>
                            </div>
                            <NavLink className="navbar-item" to="/noods" style={{ fontSize: "1.5rem" }}>Tasty Noods</NavLink>
                            <NavLink className="navbar-item" to="/pantry" style={{ fontSize: "1.5rem" }}>My Pantry</NavLink>
                        </div>
                        <div className="navbar-end">
                            <div className="navbar-item">
                                {user.isAdmin?
                                <div className="navbar-item has-dropdown is-hoverable">
                                    <p className="navbar-link" style={{ fontSize: "1.5rem" }}>Admin</p>
                                    <div className="navbar-dropdown">
                                        <NavLink className="navbar-item" to="/comments/review">Review Comments</NavLink>
                                        <NavLink className="navbar-item" to="/noods/new">Add Nood & Ratings</NavLink>
                                    </div>
                                </div> : null}
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
    else{
        return(
            <></>
        )
    }

}
export default Navbar;