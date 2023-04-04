import { useEffect, useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext"; 
import NoodCard from "./NoodCard";
import NoodReview from "./NoodReview";
import Search from "./Search";
import { titleColor } from "../Helpers";

function Noods(){

   

    const {user} = useContext(UserContext);

    const [noods, setNoods] = useState([]);
    const [showReview, setShowReview] = useState(null);
    const [search, setSearch] = useState("");
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

    function handleDeleteNood(id){
        const newNoodList = noods.filter(nood => nood.id !== id);
        setNoods(newNoodList);
        toggleShowReview();
    }

    function toggleShowReview(id){
        !showReview ? setShowReview(id) : setShowReview(null);
        setSearch("");
    }

    function handleUpdateNood(updatedNood){
        console.log("updated", updatedNood)
        const newNoodList = noods.map(nood => nood.id === updatedNood.id ? updatedNood : nood);
        setNoods(newNoodList);
    }

    const noodsToRender = showReview? noods.filter(nood => nood.id === showReview) : noods
    const filteredNoods = noodsToRender.filter(nood => nood.brand.toLowerCase().includes(search.toLowerCase()) || nood.flavor.toLowerCase().includes(search.toLowerCase()))
    const noodCardsToRender = filteredNoods.map(nood => <NoodCard key={nood.id} nood={nood} onClick={toggleShowReview} onDeleteNood={handleDeleteNood}/>)

    useEffect(()=>{
        if(!user){
            navigate('/login')
        }
        else{
            fetchNoods();
        }
    // eslint-disable-next-line
    },[user])

    if(showReview){
        return(
            <NoodReview nood_id={showReview} onDeleteNood={handleDeleteNood} onClick={toggleShowReview} onUpdateNood={handleUpdateNood} onCancel={toggleShowReview}/> 
        )
    }
    else{
        return (
            <div>
                <Search search={search} setSearch={setSearch}/>
            <div >
                
                {noodCardsToRender.length === 0 ?  
                <div style={{ height: "100vw" }}><h1 className="title has-text-centered" style={{ color: titleColor }}>Uh oh, no noods found. Time to broaden your search.</h1> </div>
                :
                noodCardsToRender}
               
            </div>
            </div>
        )

    }
    
   
}

export default Noods;