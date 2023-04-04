import ReactStars from "react-stars";
import { useEffect, useState, useContext} from "react";
import { RATINGS } from "./Ratings";
import { UserContext } from "./UserContext";
import NewNoodForm from "./NewNoodForm";
import DeleteNoodModal from "./DeleteNoodModal";
import { avatarPlaceholder, ramenBanner, ramen1, ramen2 } from "../Helpers";


const NoodReview = ({nood_id, onDeleteNood, onClick, onUpdateNood, onCancel}) => {


    const [nood, setNood] = useState(null);
    const {user} = useContext(UserContext);
    const [showDeleteModal, setsShowDeleteModal] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false)


    useEffect(()=>{
        fetch(`/noods/${nood_id}`)
        .then(r => r.json())
        .then(data => {
            setNood(data)})
        .catch(error => console.log(error))
    },[nood_id])

    function handleEditClick(){
        setShowEditForm(!showEditForm)
      }
    
      function handleDeleteClick(){
        setsShowDeleteModal(true);
      }
    
      function onCancelDelete(){
        setsShowDeleteModal(false)
      }

      function resetNoods(){
        setShowEditForm(!showEditForm);
      }

      function handleUpdateNood(nood){
        setNood(nood);
        onUpdateNood(nood.id);
      }

      async function handleAddToPantryClick(){
        const response = await fetch('/pantry', {
          method: "POST",
          headers:{"Content-Type" : "application/json"},
          body: JSON.stringify({nood_id: nood.id})
        })
        const data = await response.json();
        if(response.ok){
            window.alert("Nood Added");
        }
        else{
            console.log(data)
        }
      }

    if(nood){

        return (

            showEditForm ? <NewNoodForm noodId={nood.id} onCancel={resetNoods} onUpdateNood={handleUpdateNood}/> :
            
            <div style={{ position: 'relative' }}>
                {user.isAdmin ? 
        <>
        <i
        className="material-icons is-clickable"
        style={{ position: 'absolute', top: 0, right: 70, zIndex: 1 }}
        onClick={handleEditClick}
        >
        edit
        </i>
        <i
        className="material-icons is-clickable"
        style={{ position: 'absolute', top: 0, right: 100 , zIndex: 1}}
        onClick={handleDeleteClick}
        >
        delete
        </i>
        </>
    : null}
    <i
    className="material-icons is-clickable"
    style={{ position: 'absolute', top: 0, right: 40, zIndex: 1 }}
    onClick={handleAddToPantryClick}>add
    </i>
    <i
    className="material-icons is-clickable"
    style={{ position: 'absolute', top: 0, right: 10, zIndex: 1 }}
    onClick={onClick}>arrow_back
    </i>
    
    <div className="section tile is-ancestor">
    <div className="tile is-parent">
        <div className="tile is-child is-12">
        <figure className="image is-3by1">
            <img src={nood.pictures? nood.pictures[0] : ramenBanner} alt="Nood banner"/>
        </figure>
        </div>
    </div>
    </div>
    <div className="tile is-ancestor">
    <div className="tile is-parent">
        <article className="tile is-child box">
        <figure className="image is-3">
            <img src={nood.pictures ? nood.pictures[1] : ramen1 } alt="Nood pic" />
        </figure>
        </article>
    </div>
    <div className="tile is-parent is-vertical">
    <article className="tile is-child box">
        <p className="title is-2">{nood.brand}</p>
        <p className="subtitle is-3">{nood.flavor}</p>
        <p className="subtitle is-4">Cuisine: {nood.cuisine}</p>
        <p className="subtitle">Nood Type: {nood.nood_type}</p>
    </article>
    <article className="tile is-child box">
        <p className="subtitle is-4 ">Cooking Time: {nood.cook_time} minutes</p>
        <p className="subtitle is-4 ">Price: $ {nood.price}</p>
        <p className="subtitle is-4 ">Found at: {nood.stores.map(store => store.name).join(', ')}</p>
        <p className="subtitle is-4 ">Contents: {nood.contents.join(', ')}</p>
        <div className="content">
        <p></p>
        </div>
    </article>
    </div>
    </div>
                    
            <div className="tile is-ancestor">
            <div className="tile is-parent ">
              <article className="tile is-child box has-text-centered is-0">
                <p className="title">Rating</p>
                {RATINGS.map(item => (
                  <div className="columns is-vcentered has-text-right" key={item.name}>
                    <div className="column">
                      <h5 className="subtitle is-5">{item.label}:</h5>
                    </div>
                    <div className="column has-text-right">
                      <ReactStars
                        count={5}
                        edit={false}
                        value={Number(nood.rating[item.name])}
                        size={30}
                      />
                    </div>
                  </div>
                ))}
                <hr className="is-divider" />
                <div className="columns is-vcentered has-text-right">
                  <div className="column">
                    <h5 className="subtitle is-4">Overall Rating:</h5>
                  </div>
                  <div className="column has-text-right">
                    <ReactStars
                      count={5}
                      edit={false}
                      value={Number(nood.rating.overall_rating)}
                      size={35}
                    />
                  </div>
                </div>
              </article>
            </div>
            <div className="tile is-parent ">
                <div className="tile is-vertical">
                    <div className="tile">
                    <div className="tile is-parent is-vertical ">
                        <article className="tile is-child box">
                        <figure className="image is-3">
                            <img src={nood.pictures ? nood.pictures[2] : ramen2 } alt="Nood pic" />
                        </figure>
                        </article>
                        <article className="tile is-child box ">
                        <div className="columns is-vcentered has-text-right">
                 
                  <div className="column has-text-centered">
                    <h5 className="subtitle is-4 ">User's Rating: </h5>
                  </div> 
                  {nood.users_rating ?<div className="column has-text-right">
                  <ReactStars
                      count={5}
                      edit={false}
                      value={Number(nood.users_rating)}
                      size={30}
                    /> 
                  </div>  :
                  <div className="column has-text-left">
                     <h5 className="subtitle is-4 ">Nothing Yet </h5>
                    </div>}
                </div>
                        </article>
                    </div>
                    </div>
                </div>
          </div>
        </div>
        <div className="tile is-ancestor">
        <div className="tile is-parent">
        <article className="tile is-child box has-text-centered">
          <h5 className="subtitle is-5">Notes</h5>
          {nood.rating.notes.split("\n").map((note, index) => (
            <p key={index}>
                {note}
                {index !== nood.rating.notes.split("\n").length - 1 && <br />}
                </p>))}
            </article>
      </div>
      </div>
      <div className="tile is-ancestor">
  {nood.pantries.length > 0 ? <div className="tile is-parent">
    <article className="tile is-child box">
      <p className="title">What people say:</p>
      {nood.pantries.map((pantry, index) => (
        <div key={pantry.author}>
          <div className="media">
            <figure className="media-left">
              <p className="image is-64x64">
                <img src={pantry.avatar ? pantry.avatar : avatarPlaceholder} alt="avatar"/>
              </p>
            </figure>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>{pantry.author}</strong>
                  <br/>
                  {pantry.comments}
                </p>
              </div>
            </div>
          </div>
          {index !== nood.pantries.length - 1 && <hr/>}
        </div>
      ))}
    </article>
  </div> : null}
</div>

{showDeleteModal ? <DeleteNoodModal nood={nood} onDelete={onDeleteNood} onCancelDelete={onCancelDelete}/> : null}
   
</div>
          )
    }
    else{
        return(<></>)
    }
    
}

export default NoodReview;
