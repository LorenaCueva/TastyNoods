import { useEffect, useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext"; 
import ReactStars from "react-stars";
import StoresForm from "./StoresForm";
import ImageUploadModal from "./ImageUploadModal";
import { RATINGS } from "./Ratings";
import { titleColor } from "../Helpers";


function NewNoodForm({noodId, onCancel, onUpdateNood}){

    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    
    const [errors, setErrors] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [stores, setStores] = useState([]);
    const [newNoodID, setNewNoodID] = useState(null);
    const [clearForm, setClearForm] = useState(false)

    const clearFormData = {
        brand: "",
        flavor: "",
        nood_type: "",
        cuisine: "",
        price: "",
        contents: "",
        cooking_time: "",
        minutes: 0,
        seconds: 0,
        notes: ""
    };
    const clearRatingData = {
        flavor_rating: 0,
        broth_characteristic: 0,
        noodle_texture: 0,
        aroma: 0,
        packaging: 0,
        completeness_of_meal: 0,
        overall_rating: 0,
    }

    const [formData, setFormData] = useState(clearFormData)
    const [ratingData, setRatingData] = useState(clearRatingData);

    useEffect(()=>{
        if(!user|| user.isAdmin === false){
            navigate('/')
        }
    },[])

    useEffect(()=>{
        if(noodId){
        fetch(`/noodReview/${noodId}`)
        .then(r => r.json())
        .then(data => {
            setFormData({
                brand: data.brand,
                flavor: data.flavor,
                nood_type: data.nood_type,
                cuisine: data.cuisine,
                price: data.price,
                contents: data.contents.join(", "),
                cooking_time: "",
                minutes: data.minutes,
                seconds: data.seconds,
                notes: data.rating.notes
            })
            setRatingData({
                flavor_rating: Number(data.rating.flavor_rating),
                broth_characteristic: Number(data.rating.broth_characteristic),
                noodle_texture: Number(data.rating.noodle_texture),
                aroma: Number(data.rating.aroma),
                packaging: Number(data.rating.packaging),
                completeness_of_meal: Number(data.rating.completeness_of_meal),
                overall_rating: Number(data.rating.overall_rating),
            })
            setStores(data.stores.map(store => store.id))
            console.log(data)
        }).catch(errors => console.log(errors))}
    },[noodId])

      
    function toggleOpenModal(){
        setOpenModal(!openModal);
        setClearForm(true);
    }
          
    function handleFormChange(e) {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    async function postData(to, sendData, method){
        return await fetch(to, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendData)
        })
    }

    async function handleFormSubmit(e){
        console.log(noodId)
        e.preventDefault();
            if(stores.length == 0 ){
                setErrors({stores: ["add stores"]});
            }
            else{
            const dataToSend = {...formData, ...ratingData, overall_rating: calculateRating(), stores: stores}
            console.log(dataToSend)
            const response = noodId ? await postData(`/noods/${noodId}`, dataToSend, "PATCH") : await postData('/noods', dataToSend, "POST")
            const data = await response.json();
            if(response.ok){
                console.log("data", data)
                setNewNoodID(data.id)
                setFormData(clearFormData);
                setRatingData(clearRatingData);
                toggleOpenModal();
                setClearForm(true);
                setStores([]);
                setErrors([]);
                if(noodId){
                    console.log("here")
                    onUpdateNood(data);
                }
            }
            else{
                setErrors(data.errors)
            }
        }   
    }

    function ratingChanged(newRating, field){
        setRatingData({...ratingData, 
            [field]: newRating
        });
    }

    function calculateRating(){
        const val = Object.values(ratingData);
        val.pop();
        const total = val.reduce((t, n) => t + n);
        return total/val.length;
    }

    function cancelForm(){
        setFormData(clearFormData);
        setRatingData(clearRatingData);
        setClearForm(true);
        setStores([]);
        setErrors([]);
    
    }
    
    function handleFormCancel(e){
        e.preventDefault();
        cancelForm();
    }

    function hasErrors(field) {
        return errors && errors[field] ? errors[field].join(", ") : null;
      }
    
      function handleCancelClick(){
       cancelForm();
       onCancel();
       }

      function handleKeyDown(e) {
        if (e.key === 'Enter') {
          e.preventDefault(); 
          const { name, value } = e.target;
          e.target.value = value + '\n'
        }
      }

 
  return(
    <div>
    {onCancel ? <button className="delete is-large is-pulled-right" onClick={handleCancelClick}></button> : null}
    <div className="has-text-centered">
        <h1 className="title" style={{ color: titleColor }}>{onCancel ? "Edit Nood!" : "New Nood!"}</h1>
    </div>
    <form onSubmit={handleFormSubmit}>
    <div className="columns is-centered">
        <div className="column is-8">
            <div className="field">
                <label className="label">Brand</label>
                <div className="control">
                    <input className="input" type="text" placeholder="e.g. Nissin" name="brand" value={formData.brand} onChange={handleFormChange}/>
                    <p className="help is-danger">{hasErrors("brand")}</p>
                </div>
            </div>
            <div className="field">
                <label className="label">Flavor</label>
                <div className="control">
                    <input className="input" type="text" placeholder="e.g. Chicken" name="flavor" value={formData.flavor} onChange={handleFormChange}/>
                    <p className="help is-danger">{hasErrors("flavor")}</p>
                </div>
            </div>
            <div className="field">
                <label className="label">Nood Type</label>
                <div className="control">
                    <input className="input" type="text" placeholder="e.g. Ramen" name="nood_type" value={formData.nood_type} onChange={handleFormChange}/>
                    <p className="help is-danger">{hasErrors("nood_type")}</p>
                </div>
            </div>
            <div className="field">
                <label className="label">Cuisine</label>
                <div className="control">
                    <input className="input" type="text" placeholder="e.g. Japanese" name="cuisine" value={formData.cuisine} onChange={handleFormChange}/>
                    <p className="help is-danger">{hasErrors("cuisine")}</p>
                </div>
            </div>
            <div className="field">
                <label className="label">Price</label>
                <div className="control has-icons-left">
                    <span className="icon is-left">$ </span>
                    <input className="input" type="number" placeholder="e.g. 3.99" name="price" value={formData.price} onChange={handleFormChange}/>
                    <p className="help is-danger">{hasErrors("price")}</p>
                </div>
            </div>
            <div className="field is-expanded">
                <label className="label">Contents <span className="is-size-7 has-text-grey">(Separated by commas. Must Include Noodles)</span></label>
                    <div className="field">
                        <p className="control is-expanded">
                            <input type="text" className="input" placeholder="e.g. Noodles, Powdered Flavor, Oil" name="contents" value={formData.contents} onChange={handleFormChange}/>
                        </p>
                    </div>
                    <p className="help is-danger">{hasErrors("contents")}</p>
            </div>
            <div className="field">
                <label className="label">Cooking Time <span className="is-size-7 has-text-grey">(max 10 mins)</span></label>
                <div className="field has-addons">
                    <p className="control">
                        <a className="button is-static">MM:SS</a>
                    </p>
                    <div className="control">
                        <input  type="number" className="input" min={0} max={10} placeholder="1" name="minutes" value={formData.minutes} onChange={handleFormChange}/>
                    </div>
                    <p className="control">
                        <a className="button is-static">:</a>
                    </p>
                    <div className="control">
                        <input  type="number" className="input" min={0} max={60} placeholder="00" name="seconds" value={formData.seconds} onChange={handleFormChange}/>
                        <p className="help is-danger">{hasErrors("cooking_time")}</p>
                    </div>
                </div>
            </div>
            <div>
                <section>
                    <label className="label">Found At:  <span className="is-size-7 has-text-grey">(Select all that apply)</span></label>
                    <StoresForm clearForm={clearForm} storesList={setStores} setClearForm={setClearForm} editStoresList={stores}/>
                    <p className="help is-danger">{hasErrors("stores")}</p>
                </section>
            </div>
        </div>
    </div>
    <div className="columns is-centered">
        <div className="column is-8">
        {RATINGS.map(rating => (
        <div className="field" key={rating.name}>
            <label className="label">{rating.label}</label>
            <div className="control">
            <ReactStars
                count={5}
                value={ratingData[rating.name]}
                onChange={value => ratingChanged(value, rating.name)}
                size={50}
                color2={'#ffd700'}
            />
            <p className="help is-danger">{hasErrors(rating.name)}</p>
            </div>
        </div>
        ))}
        <div className="field">
        <label className="label">Overall Rating</label>
        <div className="control">
            <ReactStars
            count={5}
            edit={false}
            value={calculateRating()}
            size={50}
            color2={'#ffA500'}
            />
        </div>
        </div>

        <div className="field">
            <label className="label">Notes</label>
            <div className="control">
            <textarea className="textarea" name="notes" value={formData.notes} onKeyDown={handleKeyDown} onChange={handleFormChange} rows={15} placeholder="Enter notes here"></textarea>
            <p className="help is-danger">
                    {hasErrors("notes")}
            </p>
            </div>
        </div>

        <div className="field is-grouped is-grouped-centered">
            <div className="control">
                <button className="button is-danger">{noodId ? "Update Nood" : "Add Rating"}</button>
            </div>
            <div className="control">
                <button className="button is-text" onClick={handleFormCancel}>Clear Form</button>
            </div>
        </div>
    </div>
    </div>
</form>

<ImageUploadModal noodId={newNoodID} openModal={openModal} toggleOpenModal={toggleOpenModal} clearForm={clearForm} isEdit={noodId ? noodId : null} onCancel={handleCancelClick}/>


</div>


  )
}
export default NewNoodForm;