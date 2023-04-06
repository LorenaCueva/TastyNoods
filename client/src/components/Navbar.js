import { NavLink, Outlet } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

function Navbar({goToNoods}){

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

    async function handleLogout(){
        const response = await  fetch('/logout', {
            method: "DELETE"
        })
        if(response.ok){
            await setUser(null);
            navigate('/logout')
        }
    }

    function handleNoods(){
        goToNoods();
        navigate('/noods')
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
                                <p className="button is-white pt-5" style={{ fontSize: "1.5rem" }}>{user.username}<i className="material-icons">expand_more</i></p>
                                <div className="navbar-dropdown">
                                    <NavLink className="navbar-item" to="/user">Profile</NavLink>
                                </div>
                            </div>
                            <button className="button is-white  pt-5" style={{ fontSize: "1.5rem" }} onClick={handleNoods}>Tasty Noods</button>
                            <NavLink className="button is-white pt-5" to="/pantry" style={{ fontSize: "1.5rem" }}>My Pantry</NavLink>
                        </div>
                        <div className="navbar-end">
                            <div className="navbar-item">
                                {user.isAdmin?
                                <div className="navbar-item has-dropdown is-hoverable">
                                    <button className="button is-white" style={{ fontSize: "1.5rem" }}>Admin<i className="material-icons">expand_more</i></button>
                                    <div className="navbar-dropdown">
                                        <NavLink className="navbar-item" to="/comments/review">Review Comments</NavLink>
                                        <NavLink className="navbar-item" to="/noods/new">Add Nood & Ratings</NavLink>
                                    </div>
                                </div> : null}
                                <NavLink className="button is-white" to="/about" style={{ fontSize: "1.5rem" }}>About</NavLink>
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