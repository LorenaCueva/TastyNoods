import { useEffect, useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext"; 
import NoodCard from "./NoodCard";

function Noods(){

    const {user} = useContext(UserContext);

    const [noods, setNoods] = useState([]);
    const navigate = useNavigate();

    async function fetchNoods(){
        const response = await fetch('/noods')
        const data = await response.json();
        if(response.ok){
            setNoods(data);
        }
        else{
            console.log(data.errors)
        }
    }

    const noodCards = noods.map(nood => <NoodCard key={nood.id} nood={nood}/>)

    useEffect(()=>{
        if(!user){
            navigate('/login')
        }
        else{
            fetchNoods();
        }
    },[user])

    return (
        <div>
           {noodCards}
        </div>
       
    )
}

export default Noods;