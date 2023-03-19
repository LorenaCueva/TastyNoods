import { useEffect, useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext"; 
import NoodCard from "./NoodCard";
import NoodReview from "./NoodReview";

function Noods(){

    const {user} = useContext(UserContext);

    const [noods, setNoods] = useState([]);
    const [showReview, setShowReview] = useState(null);
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

    function toggleShowReview(id){
        !showReview ? setShowReview(id) : setShowReview(null)
    }

    let noodsToRender = showReview? noods.filter(nood => nood.id === showReview) : noods
    const noodCardsToRender = noodsToRender.map(nood => <NoodCard key={nood.id} nood={nood} onClick={toggleShowReview}/>)

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
            {noodCardsToRender}
        {showReview ? 
            <NoodReview nood_id={showReview}/> 
        : null}
        </div>
    )
}

export default Noods;