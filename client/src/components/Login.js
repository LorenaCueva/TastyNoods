import { useEffect, useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { titleColor, background } from "../Helpers";

function Login({isSignup = false, logout = false}){

    const clearFormData = {
        username: "",
        password: "",
        password_confirmation: ""
    }

    const [signup, setSignup] = useState(isSignup);
    const { user, setUser } = useContext(UserContext);
    const [formData, setFormData] = useState(clearFormData);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    let displayErrors = null;
    let message = signup ? "Signup" : "Login"

    useEffect(()=>{
        if(!logout){
        fetch('/me').then(response => {
            if(response.ok){
                response.json().then(user => {
                    setUser(user);
                    navigate('/noods')
                })
            }
        })}
    // eslint-disable-next-line
    },[user])

    function handleFormChange(e){
        const { name, value } = e.target;
       setFormData({...formData, [name]:value});
    }

    async function handleFormSubmit(e){
        e.preventDefault();
        setFormData(clearFormData);
        const response = await fetch(`/${message.toLowerCase()}`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        if(response.ok){
            setUser(data);
            navigate('/noods');
        }
        else{
            setErrors(data.errors);
        }
    }

    function toggleRegister(){
        signup ? navigate('/login') : navigate('/signup')
        setFormData(clearFormData);
        setErrors([]);
        setSignup(signup => !signup);
    }

    if (errors){
        displayErrors = errors.map((e, index) => <p className="has-text-danger is-size-6" key={index}>{e}</p>)
     }
    
    return(
        <div className="hero" style={{ backgroundImage: background, height: "100vw" }}>
            <div className="hero-body">
            <div className="has-text-centered">
                <div className="columns">
                <div className="column is-half is-offset-one-quarter">
                    <div className="box">
                    <h3 className="title " style={{ color: titleColor }}>{message}</h3>
                    <p className="subtitle" style={{ color: titleColor }}>{`${message} to see our tasty noods!`}</p>
                    <img id="panda" src="https://static.vecteezy.com/system/resources/previews/000/599/203/original/vector-panda-logo-black-and-white-head.jpg" alt="panda" style={{width: "60%"}}/>
                    <div className="title is-5" style={{ color: titleColor }}>Please enter your email and password.</div>
                    <form>
                        <div className="field">
                        <p className="control has-icons-left">
                            <input className="input" type="text" name="username" placeholder="Username" value={formData.username} onChange={handleFormChange}/>
                            <span className="icon is-small is-left">
                            <i className="material-icons">person</i>
                            </span>
                        </p>
                        </div>
                        <div className="field">
                        <p className="control has-icons-left">
                            <input className="input" type="password" name="password" placeholder="Password" value={formData.password}  onChange={handleFormChange}/>
                            <span className="icon is-small is-left">
                            <i className="material-icons">lock</i>
                            </span>
                        </p>
                        </div>
                        {signup ? 
                        <div className="field">
                            <p className="control has-icons-left">
                            <input className="input" type="password" name="password_confirmation" placeholder="Password Confirmation" value={formData.password_confirmation}  onChange={handleFormChange}/>
                            <span className="icon is-small is-left">
                            <i className="material-icons">lock</i>
                            </span>
                        </p>
                        </div> : null}
                        <div className="pt-3"></div>
                        <button className="button is-block is-danger is-large is-fullwidth" onClick={handleFormSubmit}>{message}</button>
                    </form>
                    <div className="pt-3">
                    {displayErrors}
                    </div>
                    <div/>
                </div>
                    <button className="button is-primary" onClick={toggleRegister} style={{ fontSize: "1.2rem" }}>{signup ? "LogIn" : "Signup"}</button>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}

export default Login;