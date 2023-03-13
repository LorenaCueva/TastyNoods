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

    const cards = noods.map(nood => <NoodCard key={nood.id} nood={nood}/>)

    useEffect(()=>{
        if(!user){
            navigate('/login')
        }
        else{
            fetchNoods();
        }
    },[])

    return (
        <div>
           <h1>Tasty Noods here</h1>
           {cards}
        </div>
       
    )
}

export default Noods;