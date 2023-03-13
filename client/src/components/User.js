import { UserContext } from "./UserContext";
import { useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";

function User(){

    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!user){
            navigate('/login')
        }
    },[])
    
    if(user){
        return(
            <div>
                <h1>Welcome! {user.username} </h1>
            </div>
        )
    }
    else{
        return(<></>)
    }
    
}
export default User;