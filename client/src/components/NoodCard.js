import { useState } from "react";
import DeleteNoodModal from "./DeleteNoodModal"
import NewNoodForm from "./NewNoodForm";


function NoodCard({nood, onClick, onDeleteNood}){

  const [showDeleteModal, setsShowDeleteModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false)

  function handleCardClick(id){
    onClick(id)
  }

  function handleEditClick(){
    console.log(nood.id)
    setShowEditForm(!showEditForm)
  }

  function handleDeleteClick(){
    setsShowDeleteModal(true);
  }

  function onCancelDelete(){
    setsShowDeleteModal(false)
  }

    return(

    showEditForm ? <NewNoodForm noodId={nood.id}/> :

        <div>
<div style={{ position: 'relative' }}>
  <i
    className="material-icons is-clickable"
    style={{ position: 'absolute', top: 0, right: 40 }}
    onClick={() => handleEditClick(nood.id)}
  >
    edit
  </i>
  <i
    className="material-icons is-clickable"
    style={{ position: 'absolute', top: 0, right: 70 }}
    onClick={() => handleDeleteClick(nood.id)}
  >
    delete
  </i>
  <section className="section is-clickable" onClick={() => handleCardClick(nood.id)}>
  <div className="columns">
    <div className="column">
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <article className="tile is-child">
            <div className="content">
              <figure className="image is-4by3">
                <img src="../ramen1.png" alt={`Image of ${nood.brand} ${nood.flavor}`}/>
              </figure>
            </div>
          </article>
        </div>
        <div className="tile is-parent is-8">
          <article className="tile is-child notification is-danger">
            <p className="title">{nood.brand}</p>
            <p className="subtitle">{nood.flavor}</p>
            <div className="content">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</section>
</div>

{showDeleteModal ? <DeleteNoodModal nood={nood} onDelete={onDeleteNood} onCancelDelete={onCancelDelete}/> : null}




        </div> 
        //     </div>
        // </section>
    )
}
export default NoodCard;