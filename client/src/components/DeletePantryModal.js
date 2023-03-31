import { useState } from "react";

function DeletePantryModal({item, onDelete, onCancelDelete}) {

  const { brand, flavor} = item.nood;
  const [modalIsOpen, setModalIsOpen] = useState(true);

  function handleDeleteItem(){
    fetch(`/pantry/${item.id}`, {
        method: "DELETE"
      })
      .then(onDelete(item.id))
      .catch(error => console.log(error))
       setModalIsOpen(false);
       onDelete(item.id);
  }

  function handleCancelModal(){
    setModalIsOpen(false);
    onCancelDelete();
  }

  return (
    <div className={`modal ${modalIsOpen ? "is-active": ""} has-text-centered`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head has-text-danger">
          <p className="modal-card-title">Delete Nood from Pantry?</p>
          <button
            className="delete"
            aria-label="close"
            onClick={handleCancelModal}
          ></button>
        </header>
        <section className="modal-card-body">
          <p>
            Are you sure you want to delete {brand} {flavor}?
          </p>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-danger" onClick={handleDeleteItem}>
            Delete
          </button>
          <button className="button" onClick={handleCancelModal}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
}

export default DeletePantryModal;
