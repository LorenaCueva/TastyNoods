import ReactStars from "react-stars";

const ratingChanged = (newRating) => {
    console.log(newRating)
  }

function NoodReview({nood_id}){
    return(
        <div>
            <h1>
                Nood Review! {nood_id}
             </h1>
             <ReactStars
                count={5}
                onChange={ratingChanged}
                size={50}
                color2={'#ffd700'} />
        </div>
        
    )
}
export default NoodReview;