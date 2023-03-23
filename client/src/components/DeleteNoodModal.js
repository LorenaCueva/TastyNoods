import { useState } from "react";
function DeleteNoodModal({nood, onDelete, onCancelDelete}) {

  const { brand, flavor} = nood;
  const [modalIsOpen, setModalIsOpen] = useState(true);

  function handleDeleteNood(){
    fetch(`/noods/${nood.id}`, {
        method: "DELETE"
      })
      .then(onDelete(nood.id))
      .catch(error => console.log(error))
    setModalIsOpen(false)
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
          <p className="modal-card-title">Delete Nood?</p>
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
          <button className="button is-danger" onClick={handleDeleteNood}>
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

export default DeleteNoodModal;
