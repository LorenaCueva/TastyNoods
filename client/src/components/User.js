import { UserContext } from "./UserContext";
import { useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { titleColor, background, avatarPlaceholder } from "../Helpers";

function User(){

    const clearFormData = {
        password: "",
        password_confirmation: ""
    }

    let displayErrors = [];
    

    const { user } = useContext(UserContext);
    const [formData, setFormData] = useState(clearFormData);
    const [errors, setErrors] = useState([]);
    const [selectedFile, setSelectedFile] = useState({avatar: null});
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState(user && user.avatar ? user.avatar : avatarPlaceholder)
    const navigate = useNavigate();
    
    useEffect(()=>{
        require('@rails/activestorage').start();
        if(!user){
            navigate('/login')
        }
    // eslint-disable-next-line
    },[user])

    function handleFormChange(e){
        setErrors([]);
        const name = e.target.name;
        const value = e.target.value;
        setFormData({...formData, [name]:value});
     }
     function handleFileChange(e){
        setErrors([]);
        const file = e.target.files[0];
        setSelectedFile({avatar: file})
        setAvatar(URL.createObjectURL(file))
    };
  
    async function handleFormSubmit(e){
        e.preventDefault();
            setFormData(clearFormData);
            if(formData.password){
                const response = await fetch(`/users/${user.id}`, {
                    method: "PATCH",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify(formData)
                   });
                   const data = await response.json();
                   if(response.ok){
                       setErrors(["Success!"])
                   }
                   else{
                       setErrors(data.errors);
                   }
            }
            else{
                setErrors(["Password can't be blank"])
            }     
     }

     function handleFileSubmit(e){
        e.preventDefault();
        setLoading(true);
        const fileData = new FormData();
        fileData.append('avatar', selectedFile.avatar)
        fetch(`/users/${user.id}/avatar`,{
            method:"PATCH",
            body: fileData
        })
        .then(r => r.json())
        .then(data => {
            setLoading(false)
            setAvatar(data.avatar)
            setSelectedFile({avatar: null})
        })
        .catch(error => setErrors(error))
     }

     if (errors){
        displayErrors = errors.map((e, index) => <p className="has-text-danger is-size-6" key={index}>{e}</p>)
     }

    
    if(user){
        return(
            <div style={{ backgroundImage: background, height: "100vw" }}>
            <section >
            <div className="columns has-text-centered">
                <div className="column is-half is-offset-one-quarter">
                    <div className="box" >
                    <div className="title is-4" style={{ color: titleColor }}>Change Avatar</div>
                    <img id="panda" src={avatar} alt="avatar" width="150"/>
                    {loading ? <progress className="progress is-danger mt-5" max="100"></progress> : null}
                    <div className="level">
                        <div className="level-item">
                        <div className="file is-small is-centered is-danger">
                            <form encType="multipart/form-data" direct_upload="true" >
                            <label className="file-label">
                            {!loading ?
                                <>
                                <input className="file-input" type="file" name="avatar" direct_upload="true" accept="image/png, image/jpeg" multiple={false} onChange={handleFileChange}/>
                                <span className="file-cta"> Select File</span>
                                {selectedFile.avatar ? 
                                    <>
                                    <span className="file-name">{selectedFile.avatar.name}</span>
                                    <span className="button is-small is-danger" onClick={handleFileSubmit}>Change</span>
                                    </> : null
                                }
                                </> : null
                            }
                            </label>
                            </form>
                        </div>
                    </div>
                    </div><br/>
                    <form>
                        <div className="title is-4" style={{ color: 'orange' }}>Change Password</div>
                        <div className="field">
                        <p className="control has-icons-left">
                            <input className="input" type="password" name="password" placeholder="New Password" value={formData.password} onChange={handleFormChange}/>
                            <span className="icon is-small is-left">
                            <i className="material-icons">lock</i>
                            </span>
                        </p>
                        </div>
                        <div className="field">
                        <p className="control has-icons-left">
                            <input className="input" type="password" name="password_confirmation" placeholder="Password Confirmation" value={formData.password_confirmation} onChange={handleFormChange}/>
                            <span className="icon is-small is-left">
                            <i className="material-icons">lock</i>
                            </span>
                        </p>
                        </div>
                        <div className="pt-3"></div>
                        <button className="button is-block is-danger is-large is-fullwidth" onClick={handleFormSubmit}>Change Password</button>
                        </form> 
                        <div className="pt-3">{displayErrors}</div>
                    </div>
                
                </div>
            </div>
            </section>

            {/* <section>
            <div className="container is-fluid">
            <div className="columns is-centered is-vcentered" style={{ minHeight: '100vh' }}>
                <div className="column is-half">
                    <div className="tile is-parent is-vertical"> */}
                        {/* <div className="tile is-child has-text-centered box">
                            <p className="title">Tile 1</p>
                            <img id="panda" src="../ramen1.png" alt="panda" width= "30%"/>
                            <div className="is-right">
                    <button className="button is-small">
                    <span>Change Avatar</span>
                    <span className="icon is-small">
                    <i className="material-icons">edit</i>
                    </span>
                    </button>
                    </div>
                        </div> */}
                        {/* <article className="tile is-child">
      <div className="content">
      <figure className="image is-4by3">
            <img src="../ramen1.png"/>
          </figure>
          <div className="is-right">
                    <button className="button is-small">
                    <span>Change Avatar</span>
                    <span className="icon is-small">
                    <i className="material-icons">edit</i>
                    </span>
                    </button>
                    </div>
        
      </div>
    </article>
                        <div className="tile is-child box">
                            <p className="title">Tile 2</p>
                            <p>Content for Tile 2</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            </section> */}
            </div>
        )
    }
    else{
        return(<></>)
    }
    
}
export default User;