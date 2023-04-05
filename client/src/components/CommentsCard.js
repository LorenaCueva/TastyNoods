import ReactStars from "react-stars";
import { useState } from "react";
import DeleteCommentModal from "./DeleteCommentModal";

function CommentsCard({item, onCommentReviewed}){

    const [showDeleteModal, setsShowDeleteModal] = useState(false);

    function handleAcceptClick(){
        fetch(`/comments/${item.id}`,{ 
            method: "PATCH"
        })
        .then(r => r.json())
        .then(data => {
            onCommentReviewed(item.id)
        })
        .catch(error => console.log(error))
    }

    function toggleDeleteModal(){
        setsShowDeleteModal(!showDeleteModal);
    }

    if(showDeleteModal){
        return(
            <DeleteCommentModal item={item} onCancelDelete={toggleDeleteModal} onDelete={onCommentReviewed}/>
        )
    }

    else{
        return (
            <div className="column is-one-quarter" key={item.id}>
              <div className="card">
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
                  <hr className="is-divider"/>
                    <div className="columns is-vcentered">
                        <div className="column is-narrow">
                        <h5 className="subtitle is-6">User's Rating:</h5>
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
                   <div className="content">
                        <blockquote className="has-text-centered" style={{
                                                                    overflowY: "auto",
                                                                    display: "inline-block",
                                                                    maxWidth: "100%"
                                                                }}>{item.comments}</blockquote>
                        <p className="has-text-right">By: {item.author}</p>
                   <hr className="is-divider"/>
                    <div className="columns is-vcentered is-justify-content-space-between">
                        <div className="column is-narrow">
                        <span className="icon pr-4 is-clickable">
                            <i className="material-icons" onClick={toggleDeleteModal}>delete</i>
                        </span>
                        <span className="icon has-text-success is-clickable">
                            <i className="material-icons" onClick={handleAcceptClick}>thumb_up</i>
                        </span>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}
export default CommentsCard;