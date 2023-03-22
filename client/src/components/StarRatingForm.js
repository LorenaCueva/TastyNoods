import { useState } from "react";

function StarRatingForm({errors = null, }){
    
    const clearRatingData = {
        flavor_rating: 0,
        broth_characteristic: 0,
        noodle_texture: 0,
        aroma: 0,
        packaging: 0,
        completeness_of_meal: 0,
        overall_rating: 0,
    }

    const [ratingData, setRatingData] = useState(clearRatingData);
    
    function ratingChanged(newRating, field){
        console.log(field, newRating);
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

    function hasErrors(field) {
        return errors && errors[field] ? errors[field].join(", ") : null;
      }

    return(
    <form>
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
                    <ReactStars count={5} edit={false} value={calculateRating()} size={50} color2={'#ffA500'} />
                    </div>
                </div>
            </div>
        </div>
    </form>
    )
}
export default StarRatingForm;