import { UserContext } from "./UserContext";
import { useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

function Pantry(){

    const { user } = useContext(UserContext);
    const [pantry, setPantry] = useState([]);
    const navigate = useNavigate();

    async function fetchPantry(){
        const response = await fetch('/pantry')
        const data = await response.json();
        if(response.ok){
            setPantry(data);
        }
        else{
            console.log(data.errors)
        }
    }

    useEffect(()=>{
        if(!user){
            navigate('/login')
        }
        else{
            fetchPantry();
        }
    },[])

    console.log(pantry)

    return(
        <div>Pantries Here</div>
    )
}
export default Pantry;