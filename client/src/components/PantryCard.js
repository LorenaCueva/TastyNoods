import { useState } from "react";
import ReactStars from "react-stars";
import DeletePantryModal from "./DeletePantryModal";

function PantryCard({ item, onDelete, onEdit}) {

  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(item.rating ? Number(item.rating) : 0);
  const [comments, setComments] = useState(item.comments ? item.comments : "");
  const [showDeleteModal, setsShowDeleteModal] = useState(false);

  const image = item.nood.picture ? item.nood.picture : "../noodPackage.png";

  function toggleForm(){
    setShowForm(!showForm);
  };

  function handleRatingChange(newRating){
    setRating(newRating);
  };

  function handleCommentsChange(e){
    setComments(e.target.value);
  };

  async function handleFormSubmit(e){
    e.preventDefault();
    const response = await fetch(`/pantry/${item.id}`, {
        method: "PATCH",
        headers:{"Content-Type" : "application/json"},
        body: JSON.stringify({rating: rating, comments: comments})
      })
      const data = await response.json();
      if(response.ok){
        console.log("edited", data)
        onEdit(data);
        setShowForm(false);
      }
      else{
        console.log(data.errors);
      }
  }

  function toggleDeleteModal(){
    setsShowDeleteModal(!showDeleteModal)
  }

  function handleDeleteItem(id){
    toggleDeleteModal();
    onDelete(id);
  }

  if(showDeleteModal){
    return(
        <DeletePantryModal item={item} onCancelDelete={toggleDeleteModal} onDelete={handleDeleteItem}/>
    ) 
  }
  else{
    return (
        <div className="column is-one-quarter" key={item.id}>
          <div className="card">
            <div className="card-image has-text-centered">
              <figure className="image is-square">
                <img src={image} alt="Nood pic"/>
              </figure>
            </div>
            <div className="card-content">
              <h5 className="title is-5 has-text-centered">{item.nood.brand}</h5>
              <p className="subtitle  has-text-centered">{item.nood.flavor}</p>
              <div className="columns is-vcentered">
                <div className="column is-narrow">
                  <h5 className="subtitle is-6">Overall Rating:</h5>
                </div>
                <div className="column">
                  <ReactStars
                    count={5}
                    edit={false}
                    value={Number(item.nood.overall_rating)}
                    size={21}
                  />
                </div>
              </div>
              {Number(item.nood.user_rating) > 0 ?<div className="columns is-vcentered">
                <div className="column is-narrow">
                  <h5 className="subtitle is-6">User's Rating:</h5>
                </div>
                <div className="column">
                  <ReactStars
                    count={5}
                    edit={false}
                    value={Number(item.nood.user_rating)}
                    size={21}
                  />
                </div>
              </div> : null}
              {item.rating && !showForm? 
                <div className="columns is-vcentered">
                    <div className="column is-narrow">
                    <h5 className="subtitle is-6">My Rating:</h5>
                    </div>
                    <div className="column">
                    <ReactStars
                    count={5}
                    edit={false}
                    value={Number(item.rating)}
                    size={21}
                    />
                    </div>
                </div>
               : null }
               <div className="content">
               {item.comments && !showForm?
                    <blockquote className="has-text-centered" style={{ overflowY: "auto"}}>{item.comments}</blockquote>
               :null}
               <hr className="is-divider"/>
                <div className="columns is-vcentered is-justify-content-space-between">
                    <div className="column is-narrow">
                    <button className="button is-small is-white" onClick={toggleDeleteModal}>
                        <i className="material-icons">delete</i>
                    </button>
                    </div>
                    <div className="column is-narrow">
                    <button className="button is-small" onClick={toggleForm}>
                        Rate Nood
                    </button>
                    </div>
                </div>
                {showForm && (
                  <form onSubmit={handleFormSubmit} >
                    <div className="field pt-2">
                      <label className="label">My Rating</label>
                      <ReactStars
                        count={5}
                        value={rating}
                        size={30}
                        onChange={handleRatingChange}
                      />
                    </div>
                    <div className="field">
                      <label className="label">My Comments</label>
                      <div className="control">
                        <textarea
                          className="textarea"
                          placeholder="Enter your comment here"
                          value={comments}
                          onChange={handleCommentsChange}
                        ></textarea>
                      </div>
                    </div>
                    <button className="button is-primary" type="submit">
                      Submit
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )
  }
}

export default PantryCard;
