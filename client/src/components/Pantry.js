import { UserContext } from "./UserContext";
import { useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import PantryCard from "./PantryCard";
import Search from "./Search";
import { titleColor } from "../Helpers";

function Pantry(){

    const { user } = useContext(UserContext);
    const [pantryItems, setPantryItems] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    async function fetchPantry(){
        const response = await fetch('/pantry')
        const data = await response.json();
        if(response.ok){
            console.log(data)
            setPantryItems(data);
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

    function handleDeleteItem(id){
       const newPantry = pantryItems.filter(item => item.id !== id);
       setPantryItems(newPantry);
    }

    function handleEditItem(editedItem){
        const newPantry = pantryItems.map(item => item.id === editedItem.id ? editedItem : item)
        setPantryItems(newPantry);
    }

   const filteredItems = pantryItems.filter(item => item.nood.brand.toLowerCase().includes(search.toLowerCase()) || item.nood.flavor.toLowerCase().includes(search.toLowerCase()))

  const pantryItemsToRender = filteredItems.map(item => (
    <PantryCard item={item} key={item.id} onDelete={handleDeleteItem} onEdit={handleEditItem}/>
  ))

    return(
        <div>
            <Search search={search} setSearch={setSearch}/>
            {pantryItemsToRender.length === 0 ? 
            <div style={{ height: "100vw" }}><h1 className="title has-text-centered" style={{ color: titleColor }}>Uh oh, no noods found. Time to broaden your search.</h1></div>
             : 
            <div className="columns is-multiline">
                {pantryItemsToRender}
            </div>}
        </div>
    )
}
export default Pantry;