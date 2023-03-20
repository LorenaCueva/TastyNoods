// import { ErrorResponse } from "@remix-run/router";
import { useState } from "react";
import ReactStars from "react-stars";

function NewNoodForm(){

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
    var [errors, setErrors] = useState({});    
      
    function handleFormChange(e) {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    async function postData(to, sendData){
        const response = await fetch(to, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendData)
        })
        const data = await response.json();
        return data  
    }

    async function handleFormSubmit(e){
        e.preventDefault();
        console.log(formData);
        console.log(ratingData);
        console.log(calculateRating())
        const dataToSend = {...formData, ...ratingData, overall_rating: calculateRating()}
        console.log(dataToSend)
        const data = await postData('/noods', dataToSend)
        if(data.ok){
           
        //     const ratingData = await postData('/ratings', ratingData)
            // if(ratingData.ok){
                console.log("Yay!")
            }
            else{
                setErrors(data.errors)
            }
        // }
        // else{
        //     setErrors(data.errors)
        // }
    }
    function ratingChanged(newRating, field){
        console.log(field, newRating);
        setRatingData({...ratingData, 
            [field]: newRating
        });
    }

    function calculateRating(){
        const val = Object.values(ratingData)
        const total = val.reduce((t, n) => t + n)
        return total/val.length
    }
    
    
    function handleFormCancel(e){
        e.preventDefault();
        setFormData(clearFormData);
        setRatingData(clearRatingData);
    }

    function hasErrors(field) {
        return errors && errors[field] ? errors[field].join(", ") : null;
      }
      
    
  return(
<div>
    <form onSubmit={handleFormSubmit}>
    <div className="columns is-centered">
        <div className="column is-8">
        <div className="field">
            <label className="label">Brand</label>
            <div className="control">
            <input className="input" type="text" placeholder="e.g. Nissin" name="brand" value={formData.brand} onChange={handleFormChange}/>
            <p className="help is-danger">
            {hasErrors("brand")}
            </p>
            </div>
        </div>
        <div className="field">
            <label className="label">Flavor</label>
            <div className="control">
            <input className="input" type="text" placeholder="e.g. Chicken" name="flavor" value={formData.flavor} onChange={handleFormChange}/>
            <p className="help is-danger">
            {hasErrors("flavor")}
            </p>
            </div>
        </div>
        <div className="field">
            <label className="label">Nood Type</label>
            <div className="control">
            <input className="input" type="text" placeholder="e.g. Ramen" name="nood_type" value={formData.nood_type} onChange={handleFormChange}/>
            <p className="help is-danger">
            {hasErrors("nood_type")}
            </p>
            </div>
        </div>
        <div className="field">
            <label className="label">Cuisine</label>
            <div className="control">
            <input className="input" type="text" placeholder="e.g. Japanese" name="cuisine" value={formData.cuisine} onChange={handleFormChange}/>
            <p className="help is-danger">
            {hasErrors("cuisine")}
            </p>
            </div>
        </div>
        {/* <div className="field">
            <label className="label">Price</label>
            <div className="control">
            <input className="input" type="text" placeholder="e.g. 3.99" name="price" value={formData.price} onChange={handleFormChange}/>
            </div>
        </div> */}
        <div className="field">
    <label className="label">Price</label>
    <div className="control has-icons-left">
        <span className="icon is-left">$</span>
        <input className="input" type="number" placeholder="e.g. 3.99" name="price" value={formData.price} onChange={handleFormChange}/>
        <p className="help is-danger">
            {hasErrors("price")}
        </p>
    </div>
    </div>

    <div className="field is-expanded">
        <label className="label">Contents <span className="is-size-7 has-text-grey">(Separated by commas. Must Include Noodles)</span></label>
            <div className="field">
                {/* <p className="control">
                    <a className="button is-static">Noodles,</a>
                </p> */}
                <p className="control is-expanded">
                    <input type="text" className="input" placeholder="e.g, Powdered Flavor, Oil" name="contents" value={formData.contents} onChange={handleFormChange}/>
                </p>
            </div>
            <p className="help is-danger">
                {hasErrors("contents")}
            </p>
    </div>

      <div className="field">
        <label className="label">Cooking Time <span className="is-size-7 has-text-grey">(max 10 mins)</span></label>
        <div className="field has-addons">
        <p className="control">
            <a className="button is-static">MM:SS</a>
        </p>
        <div className="control">
          <input  type="number" className="input" min={1} max={10} placeholder="1" name="minutes" value={formData.minutes} onChange={handleFormChange}/>
        </div>
        <p className="control">
            <a className="button is-static">:</a>
        </p>
        <div className="control">
          <input  type="number" className="input" min={0} max={60} placeholder="00" name="seconds" value={formData.seconds} onChange={handleFormChange}/>
          <p className="help is-danger">
            {hasErrors("cooking_time")}
          </p>
        </div>
        </div>
      </div>
      
    </div>


  </div>
<div className="columns is-centered">
    <div className="column is-8">
  <div className="field">
    <label className="label">Flavor</label>
    <div className="control">
      <ReactStars count={5} value={ratingData.flavor_rating} onChange={(rating)=>ratingChanged(rating, "flavor_rating")} size={50} color2={'#ffd700'} />
      <p className="help is-danger">
            {hasErrors("flavor_rating")}
      </p>
    </div>
  </div>
  <div className="field">
    <label className="label">Broth Characteristic</label>
    <div className="control">
      <ReactStars count={5} value={ratingData.broth_characteristic} onChange={(rating)=>ratingChanged(rating, "broth_characteristic")} size={50} color2={'#ffd700'} />
      <p className="help is-danger">
            {hasErrors("broth_characteristic")}
      </p>
    </div>
  </div>

  <div className="field">
    <label className="label">Noodle Texture</label>
    <div className="control">
      <ReactStars count={5} value={ratingData.noodle_texture} onChange={(rating)=>ratingChanged(rating, "noodle_texture")} size={50} color2={'#ffd700'} />
      <p className="help is-danger">
            {hasErrors("noodle_texture")}
      </p>
    </div>
  </div>

  <div className="field">
    <label className="label">Aroma</label>
    <div className="control">
      <ReactStars count={5} value={ratingData.aroma} onChange={(rating)=>ratingChanged(rating, "aroma")} size={50} color2={'#ffd700'} />
      <p className="help is-danger">
            {hasErrors("aroma")}
      </p>
    </div>
  </div>

  <div className="field">
    <label className="label">Packaging</label>
    <div className="control">
      <ReactStars count={5} value={ratingData.packaging} onChange={(rating)=>ratingChanged(rating, "packaging")} size={50} color2={'#ffd700'} />
      <p className="help is-danger">
            {hasErrors("packaging")}
      </p>
    </div>
  </div>

  <div className="field">
    <label className="label">Completeness of Meal</label>
    <div className="control">
      <ReactStars count={5} value={ratingData.completeness_of_meal} onChange={(rating)=>ratingChanged(rating, "completeness_of_meal")} size={50} color2={'#ffd700'} />
      <p className="help is-danger">
            {hasErrors("completeness_of_meal")}
      </p>
    </div>
  </div>

  <div className="field">
    <label className="label">Overall Rating</label>
    <div className="control">
      <ReactStars count={5} edit={false} value={calculateRating()} size={50} color2={'#ffd700'} />
    </div>
  </div>

  <div className="field">
    <label className="label">Notes</label>
    <div className="control">
      <textarea className="textarea" name="notes" value={formData.notes} onChange={handleFormChange} rows={15} placeholder="Enter notes here"></textarea>
      <p className="help is-danger">
            {hasErrors("notes")}
      </p>
    </div>
  </div>

  <div className="field is-grouped is-grouped-centered">
        <div className="control">
          <button className="button is-danger">Add Rating</button>
        </div>
        <div className="control">
          <button className="button is-text" onClick={handleFormCancel}>Clear Form</button>
        </div>
    </div>
</div>
</div>
</form>
</div>


  )
}
export default NewNoodForm;